# Web AI Demo | Demonstração de IA no Navegador

---

## 🇧🇷 Português (Brasil)

### 📋 Descrição do Projeto

Este projeto demonstra o uso da **Prompt API** (`LanguageModel`) diretamente no navegador. A aplicação permite enviar perguntas a um modelo de linguagem local, ajustar parâmetros de geração e receber a resposta progressivamente por streaming.

O modelo é executado pelo navegador compatível, sem necessidade de uma API externa, chave de acesso ou servidor de IA próprio.

### 🎯 Objetivo

Demonstrar, de forma prática, como integrar recursos nativos de IA do navegador em uma aplicação web com JavaScript puro:

- verificar a disponibilidade do modelo;
- criar sessões de conversa;
- configurar `temperature` e `topK`;
- enviar perguntas ao modelo;
- receber respostas em streaming;
- interromper uma geração em andamento.

### 🏗️ Arquitetura da Aplicação

```text
index.html
   ↓
index.js
   ↓
LanguageModel API do navegador
   ↓
Modelo local disponibilizado pelo Chrome
   ↓
Resposta exibida progressivamente na interface
```

### 🧩 Papel dos Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Define a interface: controles de parâmetros, campo de pergunta, botão e área de resposta. |
| `index.js` | Controla eventos, cria sessões do modelo, valida requisitos e processa o streaming. |
| `style.css` | Define a apresentação visual da aplicação. |
| `package.json` | Define o comando para iniciar um servidor HTTP local. |

### ⚙️ Fluxo de Funcionamento

```text
Abertura da página
   ↓
Verificação de navegador e Prompt API
   ↓
Verificação da disponibilidade do modelo
   ↓
Usuário configura Temperature e Top K
   ↓
Usuário envia uma pergunta
   ↓
Criação de uma sessão LanguageModel
   ↓
promptStreaming() retorna os trechos da resposta
   ↓
Interface atualizada progressivamente
```

### 🧠 Parâmetros de Geração

| Parâmetro | Descrição |
|---|---|
| `temperature` | Controla a variação das respostas. Valores menores tendem a gerar textos mais previsíveis; valores maiores favorecem variedade. |
| `topK` | Limita a escolha do próximo token às opções mais prováveis. Valores menores tornam a resposta mais controlada. |

### 🛑 Interrupção de Resposta

A aplicação utiliza `AbortController` para permitir que a geração em andamento seja cancelada. Enquanto o modelo responde, o botão muda para **Parar**. Ao interromper, o sinal de aborto é enviado para a requisição ativa.

### 🚀 Como Executar

#### 1) Instalar dependências

```bash
npm install
```

#### 2) Iniciar o servidor local

```bash
npm start
```

#### 3) Abrir no navegador

O `http-server` exibirá uma URL local, normalmente:

```text
http://localhost:8080
```

No WSL, essa URL pode ser aberta no navegador do Windows:

```bash
explorer.exe http://localhost:8080
```

### ✅ Requisitos

- Google Chrome ou Chrome Canary recente;
- Prompt API habilitada;
- dispositivo compatível com o modelo local de IA;
- página servida por `http://localhost` ou HTTPS.

A API é experimental e pode variar entre versões do navegador.

### ⚠️ Compatibilidade de Idioma

A versão atual da API exige que seja declarado um idioma de saída suportado, por exemplo:

```js
const options = {
  expectedOutputLanguages: ['en']
};

const availability = await LanguageModel.availability(options);
const session = await LanguageModel.create(options);
```

No ambiente testado, os idiomas disponíveis são: `de`, `en`, `es`, `fr` e `ja`. Português (`pt`) pode não estar disponível como idioma de saída.

### 🧰 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript ES Modules
- Prompt API / `LanguageModel`
- `AbortController`
- `http-server`

### ✨ Recursos Principais

- interface para perguntas ao modelo;
- ajuste de `temperature` e `topK`;
- resposta progressiva com `promptStreaming()`;
- cancelamento de resposta;
- verificação de compatibilidade do navegador;
- uso de IA local no navegador.

### 📌 Possíveis Melhorias

- [ ] adaptar o código para a versão mais recente da Prompt API;
- [ ] exibir progresso do download do modelo;
- [ ] manter histórico de mensagens;
- [ ] adicionar mensagens de erro mais específicas;
- [ ] oferecer seleção de idioma suportado;
- [ ] persistir configurações de geração no navegador.

---

## 🇺🇸 English (American)

### 📋 Project Description

This project demonstrates the use of the browser's **Prompt API** (`LanguageModel`). The application sends questions to a local language model, lets users adjust generation settings, and progressively displays streamed responses.

The model is provided locally by a compatible browser, with no external AI API, API key, or custom AI server required.

### 🎯 Objective

Demonstrate how to integrate native browser AI features into a plain JavaScript web application:

- check model availability;
- create conversation sessions;
- configure `temperature` and `topK`;
- submit questions to the model;
- stream generated responses;
- stop an active generation.

### 🏗️ Application Architecture

```text
index.html
   ↓
index.js
   ↓
Browser LanguageModel API
   ↓
Chrome-provided local model
   ↓
Progressively rendered response
```

### ⚙️ Execution Flow

```text
Page loads
   ↓
Browser and Prompt API validation
   ↓
Model availability check
   ↓
User configures Temperature and Top K
   ↓
User submits a question
   ↓
LanguageModel session is created
   ↓
promptStreaming() returns response chunks
   ↓
UI updates progressively
```

### 🚀 How to Run

```bash
npm install
npm start
```

Then open the URL printed by `http-server`, typically:

```text
http://localhost:8080
```

### 🧰 Technologies Used

- HTML5
- CSS3
- JavaScript ES Modules
- Prompt API / `LanguageModel`
- `AbortController`
- `http-server`