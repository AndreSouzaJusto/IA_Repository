import tf from '@tensorflow/tfjs-node';

// Função para treinar o modelo de rede neural
async function trainmodel(inputXs, outputYs) {
    // Definir o modelo de rede sequencial
    const model = tf.sequential();

    // Adicionar camadas à rede neural
    // Primeira camada oculta (LAYER DENSE)
    // inputShape define o formato dos dados de entrada onde possue o número de características (features) de cada amostra.
    // inputXs.shape[1] possui o número de características (features) de cada amostra: 7 (idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba)
    // Camada oculta com 80 neurônios devido pouca base disponível de dados.Quanto mais neurônios, maior a capacidade de aprendizado, mas também maior o risco de overfitting.
    // Ativação ReLU é usada para introduzir não-linearidade no modelo, permitindo que ele aprenda relações complexas nos dados.Age como filtro de entrada. Se a informação chegou neste neurônio 
    // é positiva,passa para frente. Se for zero ou negativo, o neurônio não dispara/descarta. Vantagem: evita o problema do gradiente desaparecendo.
    model.add(tf.layers.dense({ units: 80, activation: 'relu', inputShape: [inputXs.shape[1]] }));
    // Camada de saída com 3 neurônios e função de ativação softmax, adequada para classificação multiclasse.
    // um neurônio para cada classe de saída (premium, medium, basic)
    // ativação softmax transforma os valores de saída em probabilidades, garantindo que a soma das saídas seja igual a 1.
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

    // Compilar o modelo
    // O otimizador 'adam' é usado para ajustar os pesos da rede neural durante o treinamento, sendo um dos métodos mais modernos e eficientes. Ela aprende com historico de erros e acertos
    // A função de perda 'categoricalCrossentropy' é adequada para problemas de classificação multiclasse.Compara o que o modelo acha (o scores de cada categoria) com a verdade real (one-hot encoded).
    // A métrica 'accuracy' permite monitorar a precisão do modelo durante o treinamento.Qto mais distante de 1, melhor a precisão. Maior o erro (loss), menor a precisão.
    //exemplo: classificação de pessoas em categorias premium, medium e basic e de imagens, recomendações de produtos, categorização de usuarios, etc.
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    // Treinar o modelo
    // Ajuste do modelo aos dados de treinamento. O método fit realiza o treinamento do modelo usando os tensores de entrada e saída fornecidos.
    // epochs define o número de vezes que o modelo será treinado em todo o conjunto de dados. Quanto maior o número de epochs, maior a chance do modelo aprender padrões complexos, mas também aumenta o risco de overfitting.
    // shuffle define se os dados de entrada devem ser embaralhados a cada epoch, ajudando a evitar overfitting. True significa que os dados serão embaralhados.False significa que os dados serão usados na ordem original.
    // verbose define o nível de detalhamento das informações exibidas durante o treinamento. 0 significa sem saída e só usa callback, 1 significa barra de progresso, 2 significa uma linha por epoch.
    // callbacks: onEpochEnd - Imprime o resultado na saida de console
    // Interpretação do resultado: Começar com valor igual ou maior a 1 significa maior erro. Cada iteração (shuffle), ele diminiu o valor até ficar proximo de 0 onde singifica que está acertando com maior precisão.
    await model.fit(inputXs, outputYs, {
        epochs: 100,
        shuffle: true,
        verbose:0,
        callbacks: {
            onEpochEnd: (epoch, log) => console.log(
                `Epoch: ${epoch}: loss= ${log.loss}`
            )
        }
    });

    return model;
}

async function predict(model, pessoa) {
    // Transforma o array js em Tensor com shape [1, 7] (1 amostra, 7 features)
    const tfInput = tf.tensor2d(pessoa)

    // faz a predição
    const pred = model.predict(tfInput)
    const predArray = await pred.array()

    return predArray[0].map((prob,index) => ({prob,index}))

}

// Exemplo de pessoas para treino (cada pessoa com idade, cor e localização)
// const pessoas = [
//     { nome: "Erick", idade: 30, cor: "azul", localizacao: "São Paulo" },
//     { nome: "Ana", idade: 25, cor: "vermelho", localizacao: "Rio" },
//     { nome: "Carlos", idade: 40, cor: "verde", localizacao: "Curitiba" }
// ];

// Vetores de entrada com valores já normalizados e one-hot encoded
// Ordem: [idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba]
// const tensorPessoas = [
//     [0.33, 1, 0, 0, 1, 0, 0], // Erick
//     [0, 0, 1, 0, 0, 1, 0],    // Ana
//     [1, 0, 0, 1, 0, 0, 1]     // Carlos
// ]

// Usamos apenas os dados numéricos, como a rede neural só entende números.
// tensorPessoasNormalizado corresponde ao dataset de entrada do modelo.
const tensorPessoasNormalizado = [
    [0.33, 1, 0, 0, 1, 0, 0], // Erick
    [0, 0, 1, 0, 0, 1, 0],    // Ana
    [1, 0, 0, 1, 0, 0, 1]     // Carlos
]

// Labels das categorias a serem previstas (one-hot encoded)
// [premium, medium, basic]
const labelsNomes = ["premium", "medium", "basic"]; // Ordem dos labels
const tensorLabels = [
    [1, 0, 0], // premium - Erick
    [0, 1, 0], // medium - Ana
    [0, 0, 1]  // basic - Carlos
];

// Criamos tensores de entrada (xs) e saída (ys) para treinar o modelo
const inputXs = tf.tensor2d(tensorPessoasNormalizado)
const outputYs = tf.tensor2d(tensorLabels)

//inputXs.print();
//outputYs.print();

// Criar modelo de teste
const model = await trainmodel(inputXs, outputYs)

// Normalizar os dados da nova pessoa para fazer a previsão
// Exemplo: idade_min = 25, idade_max = 40, então (28-25)/(40-25) = 3/15 = 0.2
const pessoa = {
    nome: "Zé",
    idade: 28,
    cor: "verde",
    localizacao: "Curitiba"
}
const tensorNovaPessoaNormalizado = [ 
    [
    0.2, // idade_normalizada
    0, // cor: azul
    0, // cor: vermelho
    1, // cor: verde
    0, // São Paulo
    0, // Rio
    1  //  Curitiba
    ]
]
console.log(pessoa)

const predictions = await predict(model,tensorNovaPessoaNormalizado)
const results = predictions
    .sort((a, b) => b.prob - a.prob)
    .map( p => `${labelsNomes[p.index]}: ${(p.prob * 100).toFixed(2)}%`)
    .join("\n")

    console.log(results)
// Interpretação do resultado da predição
// Esse resultado é a predição da rede neural em probabilidades para a pessoa "Zé"!
// A saída mostra as probabilidades para cada classe, na ordem: [premium, medium, basic] 
// [ 0.1035,  0.1063,  0.7902 ]
//  ↓        ↓        ↓
// premium  medium   basic
// Interpretação:
//
// Premium: 10.35% de probabilidade
// Medium: 10.63% de probabilidade
// Basic: 79.02% de probabilidade ✅ A MAIS PROVÁVEL
// Ou seja, o modelo classificou Zé como "basic" com 79% de confiança.    
// Isso faz sentido porque:
// Zé tem cor verde e localização Curitiba
// Durante o treinamento, Carlos (que também é verde e de Curitiba) foi classificado como basic
// O modelo aprendeu esse padrão e aplicou a mesma classificação
// A soma das probabilidades é ≈ 1.0, que é exatamente o esperado com a função de ativação softmax (converte os scores em uma distribuição de probabilidades).