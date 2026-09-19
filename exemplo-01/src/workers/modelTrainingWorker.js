// Importa TensorFlow.js da CDN para usar operações de ML
import 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';
// Importa constantes de eventos para comunicação entre threads
import { workerEvents } from '../events/constants.js';

// Log de inicialização do worker
console.log('Model training worker initialized');
// Armazena contexto global (produtos, usuários, limites, índices)
let _globalCtx = {};
// Armazena o modelo neural treinado
let _model = null

// Define o peso de cada atributo na recomendação (soma = 1)
const WEIGHTS = {
    price: 0.2,  // Preço tem 20% de peso
    age: 0.1,    // Idade tem 10% de peso
    category: 0.4, // Categoria tem 40% de peso (mais importante)
    color: 0.3   // Cor tem 30% de peso
};

// Função auxiliar: normaliza valor para intervalo [0, 1]
// Fórmula: (valor - mínimo) / (máximo - mínimo)
// Exemplo: normalize(25, 18, 65) retorna 0.1224
const normalize = (value, min, max) => (value - min) / ((max - min) || 1);

// Cria o contexto contendo metadados necessários para codificar dados
function makeContext(products, users) {
    // Extrai todas as idades dos usuários
    const age = users.map(u => u.age);
    // Extrai todos os preços dos produtos
    const price = products.map(p => p.price);
    // Encontra a idade mínima entre todos os usuários
    const minAge = Math.min(...age);
    // Encontra a idade máxima entre todos os usuários
    const maxAge = Math.max(...age);
    // Encontra o preço mínimo entre todos os produtos
    const minPrice = Math.min(...price);
    // Encontra o preço máximo entre todos os produtos
    const maxPrice = Math.max(...price);
    // Extrai todas as cores únicas dos produtos (usa Set para eliminar duplicatas)
    const colors = [...new Set(products.map(p => p.color))];
    // Extrai todas as categorias únicas dos produtos
    const categories = [...new Set(products.map(p => p.category))];

    // Cria um mapa: cor => índice (ex: {vermelho: 0, azul: 1})
    const colorIndex = Object.fromEntries(colors.map((color, index) => [color, index]));
    // Cria um mapa: categoria => índice
    const categoryIndex = Object.fromEntries(categories.map((category, index) => [category, index]));

    // Calcula a idade média entre todas as idades
    const midAge = (minAge + maxAge) / 2
    // Dicionário: soma das idades de quem comprou cada produto
    const ageSums = {}
    // Dicionário: quantidade de pessoas que compraram cada produto
    const ageCounts = {}

    // Loop: para cada usuário e cada compra, acumula dados
    users.forEach(user => {
        user.purchases.forEach(p => {
            // Soma a idade do usuário ao total do produto
            ageSums[p.name] = (ageSums[p.name] || 0) + user.age;
            // Incrementa contagem de compras do produto
            ageCounts[p.name] = (ageCounts[p.name] || 0) + 1;
        });
    });

    // Cria um mapa: nome_do_produto => idade_média_normalizada
    const productAvgAgeNormalized = Object.fromEntries(
        products.map(product => {
            // Se o produto tem compras, calcula a média; senão usa a idade média geral
            const avg = ageCounts[product.name] ?
                ageSums[product.name] / ageCounts[product.name] :
                midAge;
            // Retorna [nome_produto, idade_normalizada]
            return [product.name, normalize(avg, minAge, maxAge)];
        })
    );

    // Retorna objeto com todos os metadados necessários
    return {
        products,  // Lista de produtos
        users,     // Lista de usuários
        minAge,    // Idade mínima global
        maxAge,    // Idade máxima global
        minPrice,  // Preço mínimo global
        maxPrice,  // Preço máximo global
        colors,    // Lista de cores únicas
        categories, // Lista de categorias únicas
        colorIndex, // Mapa cor => índice
        categoryIndex, // Mapa categoria => índice
        productAvgAgeNormalized, // Mapa produto => idade_média_normalizada
        numCategories: categories.length, // Quantidade de categorias
        numColors: colors.length, // Quantidade de cores
        // Dimensão total do vetor: 1 (preço) + 1 (idade) + num_categorias + num_cores
        dimentions: 2 + categories.length + colors.length
    };
}

// Cria um vetor one-hot weighted: posição 'index' fica 1, resto fica 0, depois multiplica pelo peso
// Exemplo: oneHotWeighted(1, 3, 0.4) => [0, 0.4, 0] (posição 1 ativada com peso 0.4)
const oneHotWeighted = (index, length, weight) =>
    // Cria one-hot, converte para float, e multiplica por weight
    tf.oneHot(index, length).cast('float32').mul(weight);


// Codifica um usuário em um vetor numérico normalizado
function encodeUser(user, context) {
    // Se o usuário tem compras, usa a média dos produtos comprados como perfil
    if (user.purchases.length) {
        // Codifica cada produto comprado
        return tf.stack(
            user.purchases.map(
                product => encoderProduct(product, context)
            )
        )
            // Calcula a média nas dimensões dos produtos (axis 0)
            .mean(0)
            // Redimensiona para [1, dimensions] compatível com a rede neural
            .reshape([
                1,
                context.dimentions
            ])
    }

    // Caso sem compras: cria vetor com idade normalizada, resto zeros
    return tf.concat1d(
        [
            tf.zeros([1]), // Preço ignorado para usuários sem histórico
            // Idade normalizada multiplicada pelo peso
            tf.tensor1d([
                normalize(user.age, context.minAge, context.maxAge)
                * WEIGHTS.age
            ]),
            tf.zeros([context.numCategories]), // Categoria ignorada (sem compras)
            tf.zeros([context.numColors]), // Cor ignorada (sem compras)
        ]
    ).reshape([1, context.dimentions]) // Garante formato correto
}


// Codifica um produto em um vetor numérico normalizado
function encoderProduct(product, context) {
    // Normaliza o preço e aplica o peso (WEIGHTS.price)
    const price = tf.tensor1d([
        normalize(
            product.price,
            context.minPrice,
            context.maxPrice
        ) * WEIGHTS.price]);

    // Extrai idade média de quem comprou este produto, normaliza e aplica peso
    const age = tf.tensor1d([
        (
            context.productAvgAgeNormalized[product.name] ?? 0.5 // Usa 0.5 como padrão se não encontrado
        )
        * WEIGHTS.age
    ]);

    // Cria vetor one-hot da categoria com peso aplicado
    const category = oneHotWeighted(
        context.categoryIndex[product.category], // Índice da categoria
        context.numCategories, // Total de categorias
        WEIGHTS.category // Peso da categoria
    );
    
    // Cria vetor one-hot da cor com peso aplicado
    const color = oneHotWeighted(
        context.colorIndex[product.color], // Índice da cor
        context.numColors, // Total de cores
        WEIGHTS.color // Peso da cor
    );

    // Concatena: preço + idade + categoria_one_hot + cor_one_hot = vetor completo
    return tf.concat1d([price, age, category, color]);
}

// Cria dataset de treinamento: pares (usuário+produto, label)
function createTrainingData(context) {
    // Array para armazenar todos os pares usuário+produto codificados
    const inputs = []
    // Array para armazenar o label (1 = usuário comprou, 0 = não comprou)
    const labels = []
    
    // Filtra apenas usuários com compras e processa cada um
    context.users
        .filter(u => u.purchases.length) // Ignora usuários sem histórico
        .forEach(user => {
            // Codifica o usuário e extrai os valores numéricos
            const userVector = encodeUser(user, context).dataSync()
            
            // Para cada produto no catálogo, cria um par (usuário, produto)
            context.products.forEach(product => {
                // Codifica o produto e extrai os valores numéricos
                const productVector = encoderProduct(product, context).dataSync()

                // Verifica se o usuário já comprou este produto
                const label = user.purchases.some(
                    purchase => purchase.name === product.name ? 1 : 0 // 1 se sim, 0 se não
                )
                
                // Concatena vetor do usuário + vetor do produto
                inputs.push([...userVector, ...productVector])
                // Armazena o rótulo (sim/não)
                labels.push(label)
            })
        })

    // Retorna os dados formatados para treinamento
    return {
        xs: tf.tensor2d(inputs), // Matriz de entrada [num_pares, tamanho_vetor]
        ys: tf.tensor2d(labels, [labels.length, 1]), // Matriz de rótulos [num_pares, 1]
        inputDimention: context.dimentions * 2 // Tamanho = userVector + productVector
    }
}


// ====================================================================
// 📌 Exemplo de como um usuário é ANTES da codificação
// ====================================================================
/*
const exampleUser = {
    id: 201,
    name: 'Rafael Souza',
    age: 27,
    purchases: [
        { id: 8, name: 'Boné Estiloso', category: 'acessórios', price: 39.99, color: 'preto' },
        { id: 9, name: 'Mochila Executiva', category: 'acessórios', price: 159.99, color: 'cinza' }
    ]
};
*/

// ====================================================================
// 📌 Após a codificação, o modelo NÃO vê nomes ou palavras.
// Ele vê um VETOR NUMÉRICO (todos normalizados entre 0–1).
// Exemplo: [preço_normalizado, idade_normalizada, cat_one_hot..., cor_one_hot...]
//
// Suponha categorias = ['acessórios', 'eletrônicos', 'vestuário']
// Suponha cores      = ['preto', 'cinza', 'azul']
//
// Para Rafael (idade 27, categoria: acessórios, cores: preto/cinza),
// o vetor poderia ficar assim:
//
// [
//   0.45,            // peso do preço normalizado
//   0.60,            // idade normalizada
//   1, 0, 0,         // one-hot de categoria (acessórios = ativo)
//   1, 0, 0          // one-hot de cores (preto e cinza ativos, azul inativo)
// ]
//
// São esses números que vão para a rede neural.
// ====================================================================



// Configura arquitetura da rede neural e realiza o treinamento
async function configureNeuralNetAndTrain(trainData) {
    // Cria um modelo sequencial (camadas empilhadas em ordem)
    const model = tf.sequential()
    
    // ===== CAMADA 1: ENTRADA + PRIMEIRA CAMADA OCULTA =====
    // Detecção de padrões gerais
    model.add(
        tf.layers.dense({
            inputShape: [trainData.inputDimention], // Número de features de entrada
            units: 128, // 128 neurônios para capturar muitos padrões
            activation: 'relu' // ReLU: mantém valores positivos, zera negativos (não-linearidade)
        })
    )
    
    // ===== CAMADA 2: OCULTA =====
    // Refinamento de padrões
    model.add(
        tf.layers.dense({
            units: 64, // Metade de neurônios (começar a comprimir informação)
            activation: 'relu' // Continua extraindo padrões
        })
    )

    // ===== CAMADA 3: OCULTA =====
    // Destilação de informação essencial
    model.add(
        tf.layers.dense({
            units: 32, // Mais compressão (apenas padrões mais fortes)
            activation: 'relu'
        })
    )
    
    // ===== CAMADA 4: SAÍDA =====
    // Resultado final: probabilidade entre 0 e 1
    model.add(
        // 1 neurônio porque queremos 1 score de compatibilidade
        // Sigmoid: comprime para intervalo [0, 1] (probabilidade)
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
    )

    // ===== COMPILAÇÃO =====
    // Define como o modelo aprenderá
    model.compile({
        optimizer: tf.train.adam(0.01), // Adam: otimizador adaptativo com learning rate 0.01
        loss: 'binaryCrossentropy', // Perda para classificação binária (sim/não)
        metrics: ['accuracy'] // Monitora acurácia durante treinamento
    })

    // ===== TREINAMENTO =====
    // Ajusta pesos da rede neural aos dados
    await model.fit(trainData.xs, trainData.ys, {
        epochs: 100, // Repete 100 vezes sobre todo dataset
        batchSize: 32, // Processa 32 exemplos por vez
        shuffle: true, // Embaralha para evitar memorização de ordem
        callbacks: {
            // Executa ao final de cada epoch
            onEpochEnd: (epoch, logs) => {
                // Envia progresso para thread principal (UI)
                postMessage({
                    type: workerEvents.trainingLog,
                    epoch: epoch,
                    loss: logs.loss, // Erro do treinamento
                    accuracy: logs.acc // Acurácia (porcentagem correta)
                });
            }
        }
    })

    // Retorna modelo treinado
    return model
}

// Função principal: treina o modelo com dados dos usuários
async function trainModel({ users }) {
    // Log: quantos usuários vão ser usados para treino
    console.log('Training model with users:', users);
    // Envia 1% de progresso à UI
    postMessage({ type: workerEvents.progressUpdate, progress: { progress: 1 } });
    
    // Carrega catálogo de produtos do JSON
    const products = await (await fetch('/data/products.json')).json()

    // Cria contexto com metadados (min/max, mapas, índices)
    const context = makeContext(products, users)
    
    // Codifica cada produto e armazena seu vetor numérico
    context.productVectors = products.map(product => {
        return {
            name: product.name, // Nome do produto
            meta: { ...product }, // Metadados originais do produto
            vector: encoderProduct(product, context).dataSync() // Vetor numérico codificado
        }
    })

    // Armazena contexto globalmente para usar na recomendação depois
    _globalCtx = context;

    // Cria dataset de pares (usuário+produto, label)
    const trainData = createTrainingData(context)
    
    // Treina a rede neural com os dados
    _model = await configureNeuralNetAndTrain(trainData)

    // Envia 100% de progresso
    postMessage({ type: workerEvents.progressUpdate, progress: { progress: 100 } });
    // Notifica que treinamento terminou
    postMessage({ type: workerEvents.trainingComplete });
}
function recommend({ user }) {
    // Retorna cedo se modelo não foi treinado
    if (!_model) return;
    // Obtém contexto global (catálogo, metadados, etc)
    const context = _globalCtx
    
    // Passo 1: Codifica o usuário em vetor numérico
    // Extrai os valores numéricos do tensor
    const userVector = encodeUser(user, context).dataSync()

    // Nota para aplicações em produção:
    // - Armazene vetores de produtos em banco vetorial (Postgres, Neo4j, Pinecone)
    // - Consulte: encontre K produtos mais próximos do vetor do usuário
    // - Execute predict() apenas nesses produtos (não em todos)

    // Passo 2: Cria pares (usuário, produto) para cada produto no catálogo
    // Cada par será avaliado pelo modelo para gerar score de compatibilidade
    const inputs = context.productVectors.map(({ vector }) => {
        // Concatena: vetor_usuário + vetor_produto
        return [...userVector, ...vector]
    })

    // Passo 3: Converte todos os pares em um Tensor para processamento em batch
    // Formato: [quantidade_de_produtos, tamanho_do_vetor]
    const inputTensor = tf.tensor2d(inputs)

    // Passo 4: Executa a rede neural em todos os pares de uma vez
    // Retorna scores entre 0 (não recomendado) e 1 (muito recomendado)
    const predictions = _model.predict(inputTensor)

    // Passo 5: Extrai os scores numéricos do Tensor para Array JS
    const scores = predictions.dataSync()
    
    // Passo 6: Cria array de recomendações com metadados + score
    const recommendations = context.productVectors.map((item, index) => {
        return {
            ...item.meta, // Metadados originais do produto (nome, preço, etc)
            name: item.name, // Nome do produto
            score: scores[index] // Score de compatibilidade do modelo
        }
    })

    // Passo 7: Ordena produtos por score (melhor primeiro)
    const sortedItems = recommendations
        .sort((a, b) => b.score - a.score)

    // Passo 8: Envia lista ordenada de produtos para thread principal (UI)
    postMessage({
        type: workerEvents.recommend,
        user, // Usuário para qual foi feita recomendação
        recommendations: sortedItems // Produtos ordenados por relevância
    });
}

// Mapa de handlers: associa tipo de evento à função correspondente
const handlers = {
    [workerEvents.trainModel]: trainModel, // Treina modelo quando recebe mensagem trainModel
    [workerEvents.recommend]: recommend, // Faz recomendação quando recebe mensagem recommend
};

// Escuta mensagens da thread principal (UI)
// Quando uma mensagem chega, executa o handler correspondente
self.onmessage = e => {
    // Desestrutura: extrai 'action' e coloca resto em 'data'
    const { action, ...data } = e.data;
    // Se existe handler para esta ação, executa com os dados
    if (handlers[action]) handlers[action](data);
};
