# Duck Hunter AI | Duck Hunter com Inteligência Artificial

---

## 🇧🇷 Português (Brasil)

### 📋 Descrição do Projeto

Este projeto adiciona uma camada de visão computacional ao jogo Duck Hunter. O jogo usa PixiJS no navegador e um Web Worker com TensorFlow.js para analisar imagens do canvas, localizar objetos da classe `kite` e mover automaticamente a mira até o alvo detectado.

O componente principal documentado aqui é [worker.js](DuckHunter-JS/machine-learning/worker.js). Ele carrega um modelo YOLOv5n convertido para TensorFlow.js, prepara os frames do jogo, executa inferência e envia as coordenadas dos alvos para a thread principal.

### 🎯 Objetivo

Demonstrar como integrar um modelo de detecção de objetos a uma aplicação web interativa usando:

- TensorFlow.js executado no navegador;
- Web Workers para processamento assíncrono;
- YOLOv5n convertido para o formato GraphModel;
- captura periódica do canvas do jogo;
- bounding boxes e scores de confiança;
- comunicação entre threads por `postMessage`.

### 🏗️ Arquitetura da Aplicação

```text
Jogo PixiJS
    ↓
Canvas renderizado
    ↓  a cada 200 ms
createImageBitmap(canvas)
    ↓  postMessage({ type: "predict", image })
Web Worker: machine-learning/worker.js
    ↓
TensorFlow.js + YOLOv5n
    ↓
Filtro: classe "kite" + confiança >= 0.4
    ↓  postMessage({ type: "prediction", x, y, score })
Thread principal
    ↓
Move a mira e dispara no alvo
```

### 🧠 Funcionamento do `worker.js`

O worker executa as seguintes etapas:

1. importa TensorFlow.js diretamente de uma CDN;
2. aguarda `tf.ready()` antes de utilizar o runtime;
3. carrega `labels.json` e `model.json` do modelo YOLOv5n;
4. executa um warmup com um tensor de uns para preparar o modelo;
5. recebe imagens por mensagens do tipo `predict`;
6. redimensiona cada imagem para `640 x 640`;
7. normaliza os pixels para o intervalo `[0, 1]`;
8. executa `executeAsync()` no GraphModel;
9. filtra as detecções pela confiança e pelo rótulo `kite`;
10. converte coordenadas normalizadas para pixels do canvas;
11. calcula o centro de cada bounding box;
12. envia cada alvo encontrado individualmente para a aplicação.

### 🔧 Configuração da Detecção

| Configuração | Valor | Descrição |
|---|---:|---|
| Modelo | YOLOv5n | Modelo leve para detecção de objetos |
| Entrada | `640 x 640` | Dimensão esperada pelo modelo |
| Classe analisada | `kite` | Única classe aceita pelo jogo |
| Limiar | `0.4` | Confiança mínima para uma detecção válida |
| Intervalo de captura | `200 ms` | Frequência aproximada de análise do canvas |
| Saída | `x`, `y`, `score` | Centro do alvo e confiança percentual |

O modelo possui rótulos baseados no dataset COCO. Embora o jogo seja inspirado em Duck Hunt, o worker atualmente procura especificamente a classe `kite`, conforme definido em `processPrediction()`.

### 🖼️ Pré-processamento da Imagem

A função `preprocessImage()` converte o `ImageBitmap` em um tensor compatível com o modelo:

```text
ImageBitmap
    ↓ tf.browser.fromPixels()
Tensor [altura, largura, 3]
    ↓ resizeBilinear()
Tensor [640, 640, 3]
    ↓ div(255)
Pixels normalizados entre 0 e 1
    ↓ expandDims(0)
Tensor final [1, 640, 640, 3]
```

O uso de `tf.tidy()` descarta automaticamente tensores temporários criados durante o pré-processamento, reduzindo o risco de vazamento de memória.

### 🤖 Inferência e Gerenciamento de Memória

A função `runInference()` chama `_model.executeAsync(tensor)` e extrai os três primeiros resultados esperados pelo modelo:

- `boxes`: coordenadas dos bounding boxes;
- `scores`: confiança de cada detecção;
- `classes`: índice da classe detectada.

Depois da conversão para arrays JavaScript, os tensores de entrada e saída são descartados com `tf.dispose()` para evitar crescimento contínuo do uso de memória no navegador.

### 🎯 Processamento das Predições

A função geradora `processPrediction()` percorre os resultados e descarta detecções que:

- tenham score abaixo de `0.4`;
- não correspondam ao rótulo `kite`.

Para cada detecção válida, as coordenadas normalizadas são convertidas para as dimensões reais do frame. O worker calcula o centro do retângulo e envia uma mensagem como:

```javascript
{
    type: 'prediction',
    x: 412.5,
    y: 188.0,
    score: '87.42'
}
```

O campo `score` é enviado como porcentagem formatada com duas casas decimais.

### 🔄 Comunicação entre as Threads

#### Mensagens enviadas pela aplicação ao worker

```javascript
worker.postMessage({
    type: 'predict',
    image: bitmap
}, [bitmap]);
```

O segundo argumento transfere a posse do `ImageBitmap` para o worker, evitando uma cópia desnecessária do frame.

#### Mensagens enviadas pelo worker

Quando o modelo termina de carregar:

```javascript
{ type: 'model-loaded' }
```

Quando um alvo é detectado:

```javascript
{
    type: 'prediction',
    x,
    y,
    score
}
```

A thread principal usa esses dados para atualizar o HUD, posicionar a mira e chamar o mecanismo de disparo do jogo.

### 🗂️ Estrutura Relevante do Projeto

```text
exemplo-02/
├── README.md
└── DuckHunter-JS/
    ├── machine-learning/
    │   ├── worker.js
    │   ├── main.js
    │   ├── layout.js
    │   └── yolov5n_web_model/
    │       ├── model.json
    │       ├── labels.json
    │       └── group1-shard*.bin
    ├── src/
    ├── main.js
    ├── package.json
    ├── webpack.config.js
    └── dist/
```

O arquivo `webpack.config.js` copia `yolov5n_web_model` para a saída final da aplicação, permitindo que o worker acesse `model.json`, `labels.json` e os shards binários durante a execução.

### 🚀 Como Executar

#### 1) Acessar o projeto

```bash
cd DuckHunter-JS
```

#### 2) Instalar as dependências

```bash
npm install
```

#### 3) Iniciar o servidor de desenvolvimento

```bash
npm start
```

O Webpack Dev Server é configurado para abrir a aplicação na porta `8080`:

```text
http://localhost:8080
```

#### 4) Gerar o bundle de produção

```bash
npm run build
```

### 🧰 Tecnologias Utilizadas

- JavaScript ES Modules
- TensorFlow.js
- YOLOv5n
- Web Workers
- PixiJS
- Webpack
- Webpack Dev Server
- Canvas API
- `ImageBitmap`

### ✨ Recursos Principais

- detecção de objetos no navegador;
- execução da inferência fora da thread principal;
- mira controlada automaticamente pela IA;
- processamento periódico do canvas do jogo;
- conversão de caixas detectadas em coordenadas de jogo;
- visualização do ponto previsto no HUD;
- gerenciamento explícito de memória dos tensores.

### ⚠️ Observações e Limitações

- O worker filtra a classe `kite`, não a classe `bird` ou `duck`.
- A qualidade das detecções depende do modelo, da resolução e da cena renderizada.
- O processamento contínuo a cada 200 ms pode consumir recursos da CPU e da GPU.
- O modelo precisa estar disponível no caminho `yolov5n_web_model/model.json` no bundle final.
- O projeto depende de navegador com suporte a Web Workers, `ImageBitmap`, Canvas e APIs usadas pelo TensorFlow.js.
- Os arquivos binários do modelo são necessários para execução e não devem ser confundidos com dependências geradas em `node_modules`.


---

## 🇺🇸 English (American)

### 📋 Project Description

This project adds a computer vision layer to the Duck Hunter game. The game runs with PixiJS in the browser, while a TensorFlow.js Web Worker analyzes canvas frames, locates objects from the `kite` class, and automatically moves the crosshair to detected targets.

The main component documented here is [worker.js](DuckHunter-JS/machine-learning/worker.js). It loads a YOLOv5n model converted to TensorFlow.js, preprocesses game frames, runs inference, and sends target coordinates back to the main thread.

### 🎯 Objective

The goal is to demonstrate how to integrate an object detection model into an interactive web application using:

- TensorFlow.js running in the browser;
- Web Workers for asynchronous processing;
- YOLOv5n converted to the GraphModel format;
- periodic capture of the game canvas;
- bounding boxes and confidence scores;
- cross-thread communication through `postMessage`.

### 🏗️ Application Architecture

```text
PixiJS game
    ↓
Rendered canvas
    ↓  every 200 ms
createImageBitmap(canvas)
    ↓  postMessage({ type: "predict", image })
Web Worker: machine-learning/worker.js
    ↓
TensorFlow.js + YOLOv5n
    ↓
Filter: "kite" class + confidence >= 0.4
    ↓  postMessage({ type: "prediction", x, y, score })
Main thread
    ↓
Move crosshair and shoot target
```

### 🧠 How `worker.js` Works

The worker performs the following steps:

1. imports TensorFlow.js directly from a CDN;
2. waits for `tf.ready()` before using the runtime;
3. loads `labels.json` and `model.json` for the YOLOv5n model;
4. runs a warmup with an all-ones tensor;
5. receives images through `predict` messages;
6. resizes each image to `640 x 640`;
7. normalizes pixels to the `[0, 1]` range;
8. runs `executeAsync()` on the GraphModel;
9. filters detections by confidence and the `kite` label;
10. converts normalized coordinates into canvas pixels;
11. calculates the center of each bounding box;
12. sends each detected target individually to the application.

### 🔧 Detection Configuration

| Setting | Value | Description |
|---|---:|---|
| Model | YOLOv5n | Lightweight object detection model |
| Input | `640 x 640` | Model input dimensions |
| Target class | `kite` | Only accepted class in the game |
| Threshold | `0.4` | Minimum confidence for a valid detection |
| Capture interval | `200 ms` | Approximate canvas analysis frequency |
| Output | `x`, `y`, `score` | Target center and confidence percentage |

The model uses labels based on the COCO dataset. Although the game is inspired by Duck Hunt, the worker currently searches specifically for the `kite` class, as defined in `processPrediction()`.

### 🖼️ Image Preprocessing

The `preprocessImage()` function converts an `ImageBitmap` into a model-compatible tensor:

```text
ImageBitmap
    ↓ tf.browser.fromPixels()
Tensor [height, width, 3]
    ↓ resizeBilinear()
Tensor [640, 640, 3]
    ↓ div(255)
Pixels normalized between 0 and 1
    ↓ expandDims(0)
Final tensor [1, 640, 640, 3]
```

The use of `tf.tidy()` automatically disposes temporary tensors created during preprocessing, reducing the risk of memory leaks.

### 🤖 Inference and Memory Management

The `runInference()` function calls `_model.executeAsync(tensor)` and reads the first three outputs expected from the model:

- `boxes`: bounding box coordinates;
- `scores`: confidence for each detection;
- `classes`: detected class index.

After converting values to JavaScript arrays, input and output tensors are disposed with `tf.dispose()` to prevent continuous memory growth in the browser.

### 🎯 Prediction Processing

The generator function `processPrediction()` iterates over the results and discards detections that:

- have a score below `0.4`;
- do not match the `kite` label.

For each valid detection, normalized coordinates are converted to the frame dimensions. The worker calculates the rectangle center and sends a message such as:

```javascript
{
    type: 'prediction',
    x: 412.5,
    y: 188.0,
    score: '87.42'
}
```

The `score` field is sent as a percentage formatted with two decimal places.

### 🔄 Cross-Thread Communication

#### Messages sent from the application to the worker

```javascript
worker.postMessage({
    type: 'predict',
    image: bitmap
}, [bitmap]);
```

The second argument transfers ownership of the `ImageBitmap` to the worker, avoiding an unnecessary frame copy.

#### Messages sent from the worker

When the model finishes loading:

```javascript
{ type: 'model-loaded' }
```

When a target is detected:

```javascript
{
    type: 'prediction',
    x,
    y,
    score
}
```

The main thread uses this data to update the HUD, position the crosshair, and call the game's shooting mechanism.

### 🗂️ Relevant Project Structure

```text
exemplo-02/
├── README.md
└── DuckHunter-JS/
    ├── machine-learning/
    │   ├── worker.js
    │   ├── main.js
    │   ├── layout.js
    │   └── yolov5n_web_model/
    │       ├── model.json
    │       ├── labels.json
    │       └── group1-shard*.bin
    ├── src/
    ├── main.js
    ├── package.json
    ├── webpack.config.js
    └── dist/
```

The `webpack.config.js` file copies `yolov5n_web_model` to the final application output, allowing the worker to access `model.json`, `labels.json`, and the binary shards at runtime.

### 🚀 How to Run

#### 1) Enter the project directory

```bash
cd DuckHunter-JS
```

#### 2) Install dependencies

```bash
npm install
```

#### 3) Start the development server

```bash
npm start
```

The Webpack Dev Server is configured to open the application on port `8080`:

```text
http://localhost:8080
```

#### 4) Create a production bundle

```bash
npm run build
```

### 🧰 Technologies Used

- JavaScript ES Modules
- TensorFlow.js
- YOLOv5n
- Web Workers
- PixiJS
- Webpack
- Webpack Dev Server
- Canvas API
- `ImageBitmap`

### ✨ Main Features

- object detection in the browser;
- inference execution outside the main thread;
- AI-controlled game crosshair;
- periodic processing of the game canvas;
- conversion of detected boxes into game coordinates;
- predicted-point visualization in the HUD;
- explicit tensor memory management.

### ⚠️ Notes and Limitations

- The worker filters the `kite` class, not `bird` or `duck`.
- Detection quality depends on the model, resolution, and rendered scene.
- Continuous processing every 200 ms may consume CPU and GPU resources.
- The model must be available at `yolov5n_web_model/model.json` in the final bundle.
- The project requires browser support for Web Workers, `ImageBitmap`, Canvas, and the APIs used by TensorFlow.js.
- Model binary files are required at runtime and should not be confused with generated `node_modules` dependencies.


---

### 📖 Additional Resources | Recursos Adicionais

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [TensorFlow.js Models](https://github.com/tensorflow/tfjs-models)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [YOLO Documentation](https://docs.ultralytics.com/)

---

**Author | Autor**: Andre de Souza Justo  
**Date | Data**: 2026-09-21  
**License | Licença**: MIT
