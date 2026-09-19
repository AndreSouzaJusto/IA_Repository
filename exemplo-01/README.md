# E-commerce Recommendation System | Sistema de Recomendação de E-commerce

---

## 🇧🇷 Português (Brasil)

### 📋 Descrição do Projeto

Este projeto é uma aplicação web de recomendação de produtos em e-commerce, desenvolvida com JavaScript puro, Bootstrap e TensorFlow.js. A interface mostra perfis de usuários, histórico de compras, catálogo de produtos e um modelo de machine learning treinado em background para gerar sugestões personalizadas.

O sistema foi estruturado em camadas bem definidas: visualização, controle, serviços de dados e worker de treinamento em segundo plano. A ideia central é transformar o comportamento de compra em um vetor numérico e usar uma rede neural para prever a probabilidade de um usuário gostar de um produto.

### 🎯 Objetivo

O objetivo é demonstrar, de forma didática, como um sistema de recomendação pode ser elaborado com:

- seleção de usuários;
- análise do histórico de compras;
- codificação de atributos como preço, idade, categoria e cor;
- treinamento de um modelo neural em um Web Worker;
- geração automática de produtos recomendados por relevância.

### 🏗️ Arquitetura da Aplicação

A aplicação combina interface web e processamento assíncrono em worker:

```text
index.html
   ↓
src/index.js
   ↓
Controllers + Services + Views
   ↓
Web Worker: modelTrainingWorker.js
   ↓
TensorFlow.js Model
   ↓
Recomendações por score de compatibilidade
```

### 🧩 Papel do HTML Principal

O arquivo [index.html](index.html) define a interface principal da aplicação. Ele contém:

- seletor de usuário;
- campo de idade;
- painel de compras anteriores;
- botão para treinar o modelo;
- botão para executar recomendações;
- lista de produtos renderizada dinamicamente.

A página também carrega a biblioteca `@tensorflow/tfjs-vis` para visualização do treinamento e usa Bootstrap para a apresentação visual.

### ⚙️ Funcionamento do Worker de Treinamento

O worker em [src/workers/modelTrainingWorker.js](src/workers/modelTrainingWorker.js) é o coração do mecanismo preditivo. Ele:

1. carrega o catálogo de produtos;
2. calcula contexto global com min/max de idade e preço;
3. codifica usuários e produtos em vetores numéricos;
4. estrutura dados de treinamento com pares usuário-produto;
5. cria uma rede neural sequencial;
6. treina o modelo em background;
7. executa predição para cada produto do catálogo;
8. retorna uma lista ordenada por score de recomendação.

### 🧠 Modelagem da Recomendação

A lógica de codificação parte de quatro atributos principais:

| Atributo | Peso | Descrição |
|---------|------|-----------|
| Preço | 0.2 | influencia diretamente a compatibilidade |
| Idade | 0.1 | representa perfil demográfico |
| Categoria | 0.4 | é um dos fatores mais relevantes |
| Cor | 0.3 | ajuda a capturar preferências visuais |

O modelo normaliza valores para o intervalo [0,1], converte categorias e cores em representação one-hot e combina tudo em um vetor de entrada. Esse processo permite que a rede neural aprenda padrões sem depender de texto bruto.

### 🏛️ Estrutura do Projeto

```text
exemplo-01/
├── data/
│   ├── products.json
│   └── users.json
├── src/
│   ├── controller/
│   ├── events/
│   ├── service/
│   ├── view/
│   └── workers/
├── index.html
├── index.js
├── style.css
├── package.json
├── README.md
└── refs.txt
```

### 🧪 Fluxo de Treinamento

O fluxo principal do sistema é o seguinte:

```text
Usuário selecionado
   ↓
Carrega dados em sessionStorage
   ↓
Botão "Train Model"
   ↓
Worker recebe evento trainModel
   ↓
Cria contexto e dataset para treinamento
   ↓
Rede neural com camadas [128, 64, 32, 1]
   ↓
Treinamento com Adam + Binary Crossentropy
   ↓
Modelo pronto para recomendação
   ↓
Botão "Run Recommendation"
```

### 🤖 Arquitetura da Rede Neural

O worker usa uma rede sequencial com os seguintes componentes:

```text
ENTRADA: vetor combinado usuário + produto
    ↓
Dense 128 + ReLU
    ↓
Dense 64 + ReLU
    ↓
Dense 32 + ReLU
    ↓
Dense 1 + Sigmoid
    ↓
SAÍDA: score de compatibilidade entre 0 e 1
```

#### Configuração:

- Otimizador: Adam
- Loss: Binary Crossentropy
- Métrica: Accuracy
- Epochs: 100
- Batch Size: 32
- Shuffle: true

### 📊 Dados e Recomendação

A recomendação não é baseada em nomes de produtos; ela é calculada sobre vetores numéricos. Para cada produto, o modelo recebe um par composto por:

- vetor do usuário atual;
- vetor do produto em análise;
- label binário (comprou ou não comprou).

Ao final, o sistema ordena os produtos por score e entrega a lista mais relevante para o usuário.

### 🚀 Como Executar

#### 1) Instalar dependências

```bash
npm install
```

#### 2) Iniciar a aplicação

```bash
npm start
```

#### 3) Acessar no navegador

```text
http://localhost:3000
```

### 🧰 Tecnologias Utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES Modules
- TensorFlow.js
- tfjs-vis
- Browser Sync
- Web Workers

### ✨ Recursos Principais

- seleção de usuário por perfil;
- histórico de compras em sessão;
- catálogo de produtos em interface dinâmica;
- treinamento assíncrono em worker;
- resultados de recomendação em tempo real;
- uso de ML para análise de compatibilidade entre usuários e produtos.

### 📌 Possíveis Melhorias

- [ ] persistência em banco de dados real;
- [ ] salvar e carregar modelos treinados;
- [ ] adicionar feedback explícito do usuário;
- [ ] usar embeddings ou vetorização mais avançada;
- [ ] incluir filtros por categoria, faixa de preço e cor;
- [ ] expandir o dataset com mais usuários e compras.

---

## 🇺🇸 English (American)

### 📋 Project Description

This project is a web-based e-commerce recommendation application built with plain JavaScript, Bootstrap, and TensorFlow.js. The interface displays user profiles, purchase history, product catalog, and a machine learning model trained in the background to generate personalized suggestions.

The system is organized in clear layers: view, controller, data services, and a training worker running in the background. The core idea is to convert purchasing behavior into a numerical vector and use a neural network to estimate the probability that a user will like a product.

### 🎯 Objective

The goal is to demonstrate, in a practical and educational way, how a recommendation system can be built with:

- user selection;
- analysis of purchase history;
- encoding of attributes such as price, age, category, and color;
- training a neural model in a Web Worker;
- automatic generation of ranked product recommendations.

### 🏗️ Application Architecture

The app combines web UI and asynchronous worker-based processing:

```text
index.html
   ↓
src/index.js
   ↓
Controllers + Services + Views
   ↓
Web Worker: modelTrainingWorker.js
   ↓
TensorFlow.js Model
   ↓
Recommendations by compatibility score
```

### 🧩 Role of the Main HTML

The file [index.html](index.html) defines the main web interface. It includes:

- user selector;
- age field;
- previous purchase panel;
- model training button;
- recommendation button;
- dynamically rendered product list.

The page also loads the `@tensorflow/tfjs-vis` library for training visualization and uses Bootstrap for layout and styling.

### ⚙️ How the Training Worker Works

The worker in [src/workers/modelTrainingWorker.js](src/workers/modelTrainingWorker.js) is the heart of the predictive layer. It does the following:

1. loads the product catalog;
2. computes global context such as age and price ranges;
3. encodes users and products as numeric vectors;
4. builds a training dataset from user-product pairs;
5. creates a sequential neural network;
6. trains the model in the background;
7. runs predictions across the catalog;
8. returns a sorted recommendation list by relevance.

### 🧠 Recommendation Modeling

The encoding logic is based on four main attributes:

| Attribute | Weight | Description |
|-----------|--------|-------------|
| Price | 0.2 | directly influences compatibility |
| Age | 0.1 | reflects demographic behavior |
| Category | 0.4 | one of the most important signals |
| Color | 0.3 | captures visual preferences |

The model normalizes values to the interval [0,1], transforms categories and colors into one-hot representations, and combines everything into a single input vector. This allows the neural network to learn patterns without relying on raw text.

### 🏛️ Project Structure

```text
exemplo-01/
├── data/
│   ├── products.json
│   └── users.json
├── src/
│   ├── controller/
│   ├── events/
│   ├── service/
│   ├── view/
│   └── workers/
├── index.html
├── index.js
├── style.css
├── package.json
├── README.md
└── refs.txt
```

### 🧪 Training Flow

The main execution flow is:

```text
User selected
   ↓
Load data into sessionStorage
   ↓
Click "Train Model"
   ↓
Worker receives trainModel event
   ↓
Build context and training dataset
   ↓
Neural network with layers [128, 64, 32, 1]
   ↓
Training with Adam + Binary Crossentropy
   ↓
Model ready for recommendation
   ↓
Click "Run Recommendation"
```

### 🤖 Neural Network Architecture

The worker uses a sequential network with the following components:

```text
INPUT: combined user + product vector
    ↓
Dense 128 + ReLU
    ↓
Dense 64 + ReLU
    ↓
Dense 32 + ReLU
    ↓
Dense 1 + Sigmoid
    ↓
OUTPUT: compatibility score between 0 and 1
```

#### Configuration:

- Optimizer: Adam
- Loss: Binary Crossentropy
- Metric: Accuracy
- Epochs: 100
- Batch Size: 32
- Shuffle: true

### 📊 Data and Recommendation Logic

The recommendation engine does not rely on product names as raw text. Instead, it evaluates numerical vectors composed of:

- current user vector;
- target product vector;
- binary label indicating whether the user purchased it.

At the end, the system sorts the products by score and returns the most relevant recommendations for the selected user.

### 🚀 How to Run

#### 1) Install dependencies

```bash
npm install
```

#### 2) Start the application

```bash
npm start
```

#### 3) Open the app in a browser

```text
http://localhost:3000
```

### 🧰 Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES Modules
- TensorFlow.js
- tfjs-vis
- Browser Sync
- Web Workers

### ✨ Main Features

- user profile selection;
- purchase history tracking via session storage;
- dynamic product catalog UI;
- asynchronous training in a worker;
- real-time recommendation output;
- machine learning-based compatibility analysis between users and products.

### 📌 Possible Improvements

- [ ] persistence in a real database;
- [ ] save and reload trained models;
- [ ] add explicit user feedback;
- [ ] use embeddings or more advanced vectorization;
- [ ] include filtering by category, price range, and color;
- [ ] expand the dataset with more users and purchases.

---

### 📝 Summary

This project demonstrates a complete example of a recommendation system built with client-side machine learning. It shows how frontend logic, data modeling, and neural model training can be combined to create a practical and understandable product recommendation experience.

This project demonstrates a complete example of a recommendation system built with client-side machine learning. It shows how frontend logic, data modeling, and neural model training can be combined to create a practical and understandable product recommendation experience.
