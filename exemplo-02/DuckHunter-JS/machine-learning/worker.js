// importa o TensorFlow.js para uso no worker (IA)
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest');

// Dimensões de entrada do modelo YOLOv5n
const INPUT_MODEL_DIMENTIONS = 640;
// Caminho para o modelo e os rótulos do YOLOv5n
const MODEL_PATH = `yolov5n_web_model/model.json`;
const LABELS_PATH = `yolov5n_web_model/labels.json`;
// Limiar de confiança para considerar uma predição válida
const CLASS_THRESHOLD = 0.4;

// Variáveis para armazenar os rótulos e o modelo carregado
let _labels = [];
let _model = null;

async function loadModelAndLabels() {
    // aguarda o TensorFlow.js estar pronto
    await tf.ready();

    // carrega os rótulos e o modelo do YOLOv5n
    _labels = await (await fetch(LABELS_PATH)).json();
    _model = await tf.loadGraphModel(MODEL_PATH);

    // warmup 
    // Carrega  um passo de warmup no modelo
    const dummyInput = tf.ones(_model.inputs[0].shape);
    // Executa o passo de warmup
    await _model.executeAsync(dummyInput);

    // Limpa a memória do TensorFlow.js após o warmup senão ocorreriam vazamentos de memória.
    tf.dispose(dummyInput);

    // Exibe mensagem indicando que o modelo foi carregado com sucesso
    postMessage({ type: 'model-loaded' });

}



/**
 * Pré-processa a imagem para o formato aceito pelo YOLO:
 * - tf.browser.fromPixels(): converte ImageBitmap/ImageData para tensor [H, W, 3]
 * - tf.image.resizeBilinear(): redimensiona para [INPUT_DIM, INPUT_DIM]
 * - .div(255): normaliza os valores para [0, 1]
 * - .expandDims(0): adiciona dimensão batch [1, H, W, 3]
 *
 * Uso de tf.tidy():
 * - Garante que tensores temporários serão descartados automaticamente,
 *   evitando vazamento de memória.
 */
async function preprocessImage(imageBitmap) {
    return tf.tidy(() => {
        // Converte a imagem para um tensor e inicia o pré-processamento.
        const image = tf.browser.fromPixels(imageBitmap);

        return tf.image // Retorna o tensor pré-processado após redimensionamento, normalização e adição da dimensão batch.
            .resizeBilinear(image, [INPUT_MODEL_DIMENTIONS, INPUT_MODEL_DIMENTIONS]) // Redimensiona para [INPUT_DIM, INPUT_DIM]
            .div(255) // Normaliza os valores para [0, 1]
            .expandDims(0) // Adiciona dimensão batch [1, H, W, 3]
    })
}

// Executa a inferência no tensor de entrada e retorna as predições.
// Parâmetros:
// - tensor: tensor de entrada pré-processado [1, H, W, 3]
// Retorna:
// - objeto contendo boxes, scores e classes.
async function runInference(tensor) {
    // Executa a inferência usando o modelo carregado.
    const output = await _model.executeAsync(tensor);
    // Libera a memória do tensor de entrada após a inferência.
    tf.dispose(tensor);

    // Assume que a saída do modelo segue o formato [boxes, scores, classes, ...]
    // Extrai as caixas delimitadoras, pontuações e classes da saída do modelo.
    const [boxes, scores, classes] = output.slice(0, 3);
    // Libera a memória dos tensores de saída que não foram convertidos em arrays.
    const [boxesData, scoresData, classesData] = await Promise.all([
        boxes.data(),
        scores.data(),
        classes.data()
    ]);

    // Libera a memória dos tensores de saída após a conversão para arrays.
    output.forEach(t => t.dispose());
    // Retorna os dados processados para uso posterior.
    return {
        boxes: boxesData,
        scores: scoresData,
        classes: classesData
    };
}

/**
 * Filtra e processa as predições:
 * - Aplica o limiar de confiança (CLASS_THRESHOLD)
 * - Filtra apenas a classe desejada (exemplo: 'kite')
 * - Converte coordenadas normalizadas para pixels reais
 * - Calcula o centro do bounding box
 *
 * Uso de generator (function*):
 * - Permite enviar cada predição assim que processada, sem criar lista intermediária
 */
function* processPrediction({ boxes, scores, classes }, width, height) {
    // Itera sobre todas as predições e aplica filtros e transformações.
    for (let index = 0; index < scores.length; index++) {
        // Aplica o limiar de confiança para filtrar predições de baixa confiança.
        if (scores[index] < CLASS_THRESHOLD) continue;
        // Obtém o rótulo da classe predita.
        const label = _labels[classes[index]];

        // Filtra apenas a classe desejada (exemplo: 'kite').
        if (label !== 'kite') continue;

        // Converte as coordenadas normalizadas para pixels reais.
        let [x1, y1, x2, y2] = boxes.slice(index * 4, (index + 1) * 4)
        x1 *= width
        x2 *= width
        y1 *= height
        y2 *= height

        // Calcula a largura, altura e o centro do bounding box.
        const boxWidth = x2 - x1
        const boxHeight = y2 - y1
        const centerX = x1 + boxWidth / 2
        const centerY = y1 + boxHeight / 2

        // Envia a predição processada para o thread principal.
        yield {
            x: centerX,
            y: centerY,
            score: (scores[index] * 100).toFixed(2)
        }


    }
}

// Inicializa o modelo e os rótulos ao carregar o Web Worker.
loadModelAndLabels();

// Manipula mensagens recebidas pelo Web Worker.
// Espera mensagens do thread principal e responde com predições.
self.onmessage = async ({ data }) => {

    if (data.type !== 'predict') return
    // Verifica se o modelo está carregado antes de realizar a predição sobre a imagem bitmap capturada.
    if (!_model) return;
    // Aqui você pode adicionar o código para processar a imagem bitmap e realizar a predição usando o modelo carregado.

    // Realiza a predição usando o modelo carregado e a imagem pré-processada.
    const input = await preprocessImage(data.image);

    // Obtém as dimensões da imagem para uso posterior no mapeamento das coordenadas de predição.
    const { width, height } = data.image;

    // Executa a inferência no tensor de entrada pré-processado.
    // Retorna os resultados da inferência.
    const inference = await runInference(input);

    // Processa cada predição e envia para o thread principal assim que estiver pronta.
    for (const prediction of processPrediction(inference, width, height)) {
        // Envia a predição individual para o thread principal.
        postMessage({
            type: 'prediction',
            ...prediction
        });
    }

};
// Fim do Web Worker.
console.log('🧠 YOLOv5n Web Worker initialized');
