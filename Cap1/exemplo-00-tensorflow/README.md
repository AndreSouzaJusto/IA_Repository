# Neural Network Classification Model | Modelo de Rede Neural para Classificação

---

## 🇧🇷 Português (Brasil)

### 📋 Descrição do Projeto

Este projeto implementa uma **rede neural artificial** usando TensorFlow.js para classificar usuários em categorias de segmentação baseado em características demográficas. O modelo treina em dados normalizados e faz predições de probabilidade para cada categoria.

### 🎯 Objetivo

Classificar pessoas em três categorias de segmentação:
- **Premium**: Clientes de alto valor
- **Medium**: Clientes de médio valor
- **Basic**: Clientes de baixo valor

Baseado em:
- Idade (normalizada)
- Cor preferida (codificação one-hot: azul, vermelho, verde)
- Localização geográfica (codificação one-hot: São Paulo, Rio de Janeiro, Curitiba)

### 🏗️ Arquitetura do Modelo

```
ENTRADA (7 features)
    ↓
Camada Densa #1: 80 neurônios + ReLU
    ↓
Camada de Saída: 3 neurônios + Softmax
    ↓
SAÍDA: Probabilidades [Premium, Medium, Basic]
```

#### Camadas:

| Camada | Tipo | Unidades | Ativação | Descrição |
|--------|------|----------|----------|-----------|
| Input | Entrada | 7 | - | Idade normalizada + 3 cores + 3 localizações |
| Hidden | Dense | 80 | ReLU | Captura padrões não-lineares nos dados |
| Output | Dense | 3 | Softmax | Probabilidades das 3 categorias |

### 🔧 Configuração do Treinamento

- **Otimizador**: Adam (ajusta pesos baseado em histórico de erros)
- **Função de Perda**: Categorical Crossentropy (classificação multiclasse)
- **Métrica**: Accuracy (precisão do modelo)
- **Epochs**: 100 (passa pelos dados 100 vezes)
- **Shuffle**: True (embaralha dados para evitar viés)

### 📊 Dataset de Treinamento

```javascript
3 amostras com 7 features cada:

Erick  | idade: 0.33 | azul | São Paulo    → Premium (1, 0, 0)
Ana    | idade: 0.00 | vermelho | Rio     → Medium (0, 1, 0)
Carlos | idade: 1.00 | verde | Curitiba   → Basic (0, 0, 1)
```

### 🚀 Como Usar

#### Instalação
```bash
npm install
```

#### Executar o Modelo
```bash
npm start
```

#### Saída Esperada
```
Epoch: 0: loss= 1.234
Epoch: 1: loss= 1.045
...
Epoch: 99: loss= 0.042

Zé:
Basic: 79.02%
Medium: 10.63%
Premium: 10.35%
```

### 🧮 Normalização de Dados

Para normalizar um novo valor de idade:
```javascript
idade_normalizada = (idade - idade_mínima) / (idade_máxima - idade_mínima)

Exemplo para Zé (idade 28):
(28 - 25) / (40 - 25) = 3/15 = 0.2
```

### 🔍 Interpretação de Resultados

O modelo retorna um array de probabilidades `[premium_prob, medium_prob, basic_prob]`:

```
[ 0.1035, 0.1063, 0.7902 ]
  ↓       ↓       ↓
  10.35% 10.63%  79.02% ← Categoria mais provável
```

A soma das probabilidades sempre = 1.0 (função softmax)

### 📈 Conceitos-Chave

#### ReLU (Rectified Linear Unit)
- Ativação: `max(0, x)`
- Benefício: Evita o problema do gradiente desaparecendo
- Introduz não-linearidade permitindo aprender relações complexas

#### Softmax
- Transforma scores em distribuição de probabilidades
- Garante que a soma de todas as saídas = 1
- Ideal para classificação multiclasse

#### Overfitting vs Underfitting
- **Overfitting**: Modelo aprende "de cor" (muito memoriza)
- **Underfitting**: Modelo não aprende o suficiente
- **Solução**: Ajustar número de neurônios e epochs

### 📝 Código Principal

```javascript
// 1. Treinar modelo
const model = await trainmodel(inputXs, outputYs);

// 2. Fazer predição
const predictions = await predict(model, tensorNovaPessoaNormalizado);

// 3. Interpretar resultado
predictions.sort((a, b) => b.prob - a.prob);
console.log(`Categoria: ${labelsNomes[predictions[0].index]}`);
```

### 🛠️ Tecnologias

- **TensorFlow.js**: Framework de machine learning
- **Node.js**: Runtime JavaScript
- **npm**: Gerenciador de pacotes

### 📚 Possíveis Melhorias

- [ ] Aumentar dataset de treinamento (mais amostras)
- [ ] Adicionar validação cruzada
- [ ] Implementar regularização (dropout, L1/L2)
- [ ] Ajustar hiperparâmetros (learning rate, batch size)
- [ ] Salvar/carregar modelo treinado
- [ ] Adicionar interface web

---

## 🇺🇸 English (American)

### 📋 Project Description

This project implements an **artificial neural network** using TensorFlow.js to classify users into segmentation categories based on demographic features. The model trains on normalized data and makes probability predictions for each category.

### 🎯 Objective

Classify people into three segmentation categories:
- **Premium**: High-value customers
- **Medium**: Medium-value customers
- **Basic**: Low-value customers

Based on:
- Age (normalized)
- Preferred color (one-hot encoding: blue, red, green)
- Geographic location (one-hot encoding: São Paulo, Rio de Janeiro, Curitiba)

### 🏗️ Model Architecture

```
INPUT (7 features)
    ↓
Dense Layer #1: 80 neurons + ReLU
    ↓
Output Layer: 3 neurons + Softmax
    ↓
OUTPUT: Probabilities [Premium, Medium, Basic]
```

#### Layers:

| Layer | Type | Units | Activation | Description |
|-------|------|-------|------------|-------------|
| Input | Input | 7 | - | Normalized age + 3 colors + 3 locations |
| Hidden | Dense | 80 | ReLU | Captures non-linear patterns in data |
| Output | Dense | 3 | Softmax | Probabilities for 3 categories |

### 🔧 Training Configuration

- **Optimizer**: Adam (adjusts weights based on error history)
- **Loss Function**: Categorical Crossentropy (multiclass classification)
- **Metric**: Accuracy (model precision)
- **Epochs**: 100 (passes through data 100 times)
- **Shuffle**: True (randomizes data to avoid bias)

### 📊 Training Dataset

```javascript
3 samples with 7 features each:

Erick  | age: 0.33 | blue     | São Paulo  → Premium (1, 0, 0)
Ana    | age: 0.00 | red      | Rio        → Medium (0, 1, 0)
Carlos | age: 1.00 | green    | Curitiba   → Basic (0, 0, 1)
```

### 🚀 How to Use

#### Installation
```bash
npm install
```

#### Run the Model
```bash
npm start
```

#### Expected Output
```
Epoch: 0: loss= 1.234
Epoch: 1: loss= 1.045
...
Epoch: 99: loss= 0.042

Zé:
Basic: 79.02%
Medium: 10.63%
Premium: 10.35%
```

### 🧮 Data Normalization

To normalize a new age value:
```javascript
normalized_age = (age - min_age) / (max_age - min_age)

Example for Zé (age 28):
(28 - 25) / (40 - 25) = 3/15 = 0.2
```

### 🔍 Result Interpretation

The model returns an array of probabilities `[premium_prob, medium_prob, basic_prob]`:

```
[ 0.1035, 0.1063, 0.7902 ]
  ↓       ↓       ↓
  10.35% 10.63%  79.02% ← Most likely category
```

The sum of probabilities always = 1.0 (softmax function)

### 📈 Key Concepts

#### ReLU (Rectified Linear Unit)
- Activation: `max(0, x)`
- Benefit: Prevents vanishing gradient problem
- Introduces non-linearity allowing complex pattern learning

#### Softmax
- Transforms scores into probability distribution
- Ensures sum of all outputs = 1
- Ideal for multiclass classification

#### Overfitting vs Underfitting
- **Overfitting**: Model memorizes data too closely
- **Underfitting**: Model doesn't learn enough patterns
- **Solution**: Adjust number of neurons and epochs

### 📝 Main Code

```javascript
// 1. Train model
const model = await trainmodel(inputXs, outputYs);

// 2. Make prediction
const predictions = await predict(model, tensorNovaPessoaNormalizado);

// 3. Interpret result
predictions.sort((a, b) => b.prob - a.prob);
console.log(`Category: ${labelsNomes[predictions[0].index]}`);
```

### 🛠️ Technologies

- **TensorFlow.js**: Machine learning framework
- **Node.js**: JavaScript runtime
- **npm**: Package manager

### 📚 Possible Improvements

- [ ] Increase training dataset (more samples)
- [ ] Implement cross-validation
- [ ] Add regularization (dropout, L1/L2)
- [ ] Tune hyperparameters (learning rate, batch size)
- [ ] Save/load trained model
- [ ] Add web interface

---

### 📖 Additional Resources | Recursos Adicionais

- [TensorFlow.js Docs](https://www.tensorflow.org/js)
- [Neural Network Basics](https://en.wikipedia.org/wiki/Artificial_neural_network)
- [Machine Learning Guide](https://developers.google.com/machine-learning)

---

**Author | Autor**: Andre de Souza Justo 
**Date | Data**: 2026-09-19  
**License | Licença**: MIT
