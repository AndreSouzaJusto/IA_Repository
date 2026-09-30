# RAG com Embeddings e Neo4j | Embeddings and Neo4j RAG

---

## Português (Brasil)

### Descrição do Projeto

Este projeto demonstra uma aplicação de Retrieval-Augmented Generation (RAG) com TypeScript, LangChain, embeddings locais e Neo4j. Ele carrega o documento `tensores.pdf`, divide o conteúdo em trechos, gera vetores para esses trechos e os grava em uma base vetorial no Neo4j. Em seguida, usa os trechos mais relevantes como contexto para responder perguntas sobre TensorFlow.js por meio de um modelo acessado pelo OpenRouter.

### Objetivo

O exemplo mostra, de forma prática, como combinar:

- processamento de documentos PDF;
- divisão de texto em chunks com sobreposição;
- embeddings locais do Hugging Face;
- busca por similaridade em um banco vetorial Neo4j;
- geração de respostas contextualizadas com LangChain e OpenRouter.

### Arquitetura da Aplicação

```text
tensores.pdf
   ↓
PDFLoader + RecursiveCharacterTextSplitter
   ↓
Chunks de texto (1.000 caracteres, sobreposição de 200)
   ↓
HuggingFaceTransformersEmbeddings
   ↓
Neo4jVectorStore (nós Chunk)
   ↓
Busca vetorial: top 3 resultados
   ↓
ChatOpenAI via OpenRouter + prompt contextual
   ↓
respostas/resposta-<indice>-<timestamp>.md
```

### Estrutura do Projeto

```text
exemplo-10-embeddings-neo4j-rag/
├── prompts/
│   ├── answerPrompt.json
│   └── template.txt
├── src/
│   ├── ai.ts
│   ├── config.ts
│   ├── documentProcessor.ts
│   ├── index.ts
│   └── util.ts
├── docker-compose.yml
├── package.json
├── tensores.pdf
└── .env
```

### Papel dos Componentes

| Componente | Responsabilidade |
|---|---|
| `src/documentProcessor.ts` | Carrega o PDF e o divide em chunks com metadados de origem. |
| `src/config.ts` | Centraliza a configuração do Neo4j, embeddings, OpenRouter, PDF, prompts e splitter. |
| `src/index.ts` | Orquestra a indexação, as perguntas pré-definidas e a gravação das respostas. |
| `src/ai.ts` | Busca documentos similares no Neo4j e gera a resposta com o contexto recuperado. |
| `prompts/` | Define o papel, as regras e o template usados na geração. |
| `docker-compose.yml` | Disponibiliza o Neo4j com APOC e volumes locais. |

### Fluxo de Execução

1. O programa lê `tensores.pdf`.
2. O documento é separado em chunks de até 1.000 caracteres, com sobreposição de 200 caracteres.
3. O modelo configurado em `EMBEDDING_MODEL` gera embeddings locais para cada chunk.
4. Os nós `Chunk` existentes são removidos e os novos documentos são indexados no Neo4j.
5. Para cada pergunta, a aplicação recupera os três trechos semanticamente mais próximos.
6. Trechos com score acima de `0.5` são enviados ao modelo de linguagem como contexto.
7. A resposta é exibida no terminal e salva na pasta `respostas/`.

### Pré-requisitos

- Node.js `22.13.1` ou compatível;
- Docker com Docker Compose v2;
- chave de API do OpenRouter;
- acesso à internet na primeira execução, para baixar o modelo de embeddings e chamar o OpenRouter.

### Configuração

Instale as dependências:

```bash
npm install
```

Crie ou atualize o arquivo `.env` com as variáveis abaixo:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2
OPENROUTER_API_KEY=sua-chave-openrouter
NLP_MODEL=google/gemma-3-27b-it
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_SITE_NAME=RAG example
```

### Como Executar

Inicie o Neo4j:

```bash
npm run infra:up
```

Execute a indexação e as perguntas:

```bash
npm start
```

Durante o desenvolvimento, execute em modo watch:

```bash
npm run dev
```

Para interromper a infraestrutura e remover os volumes:

```bash
npm run infra:down
```

O Neo4j Browser fica disponível em `http://localhost:7474`.

### Atenção

Cada execução remove todos os nós com o rótulo `Chunk` antes de indexar novamente o PDF. Não utilize a mesma base para dados que precisem ser preservados.

### Tecnologias Utilizadas

- TypeScript e Node.js;
- LangChain;
- Hugging Face Transformers;
- Neo4j Community Edition e APOC;
- OpenRouter;
- Docker Compose.

---

## English (American)

### Project Description

This project demonstrates a Retrieval-Augmented Generation (RAG) application built with TypeScript, LangChain, local embeddings, and Neo4j. It loads `tensores.pdf`, splits its contents into chunks, creates vectors for those chunks, and stores them in a Neo4j vector database. It then uses the most relevant chunks as context to answer TensorFlow.js questions through a model accessed with OpenRouter.

### Objective

The example provides a practical demonstration of how to combine:

- PDF document processing;
- text splitting with overlap;
- local Hugging Face embeddings;
- similarity search in a Neo4j vector database;
- contextual response generation with LangChain and OpenRouter.

### Application Architecture

```text
tensores.pdf
   ↓
PDFLoader + RecursiveCharacterTextSplitter
   ↓
Text chunks (1,000 characters, 200-character overlap)
   ↓
HuggingFaceTransformersEmbeddings
   ↓
Neo4jVectorStore (Chunk nodes)
   ↓
Vector search: top 3 results
   ↓
ChatOpenAI through OpenRouter + contextual prompt
   ↓
respostas/resposta-<index>-<timestamp>.md
```

### Project Structure

```text
exemplo-10-embeddings-neo4j-rag/
├── prompts/
│   ├── answerPrompt.json
│   └── template.txt
├── src/
│   ├── ai.ts
│   ├── config.ts
│   ├── documentProcessor.ts
│   ├── index.ts
│   └── util.ts
├── docker-compose.yml
├── package.json
├── tensores.pdf
└── .env
```

### Component Roles

| Component | Responsibility |
|---|---|
| `src/documentProcessor.ts` | Loads the PDF and splits it into chunks with source metadata. |
| `src/config.ts` | Centralizes Neo4j, embeddings, OpenRouter, PDF, prompt, and splitter configuration. |
| `src/index.ts` | Orchestrates indexing, predefined questions, and answer persistence. |
| `src/ai.ts` | Retrieves similar documents from Neo4j and generates a response with the retrieved context. |
| `prompts/` | Defines the role, rules, and template used for generation. |
| `docker-compose.yml` | Provides Neo4j with APOC and local volumes. |

### Execution Flow

1. The application reads `tensores.pdf`.
2. The document is split into chunks of up to 1,000 characters, with a 200-character overlap.
3. The model configured by `EMBEDDING_MODEL` creates local embeddings for each chunk.
4. Existing `Chunk` nodes are removed, and the new documents are indexed in Neo4j.
5. For each question, the application retrieves the three closest semantic matches.
6. Chunks with a score above `0.5` are sent to the language model as context.
7. The answer is displayed in the terminal and stored in `respostas/`.

### Prerequisites

- Node.js `22.13.1` or compatible;
- Docker with Docker Compose v2;
- an OpenRouter API key;
- internet access on the first run to download the embedding model and call OpenRouter.

### Configuration

Install dependencies:

```bash
npm install
```

Create or update `.env` with the following variables:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2
OPENROUTER_API_KEY=your-openrouter-key
NLP_MODEL=google/gemma-3-27b-it
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_SITE_NAME=RAG example
```

### How to Run

Start Neo4j:

```bash
npm run infra:up
```

Run indexing and the questions:

```bash
npm start
```

For development watch mode:

```bash
npm run dev
```

To stop the infrastructure and remove volumes:

```bash
npm run infra:down
```

Neo4j Browser is available at `http://localhost:7474`.

### Important Notice

Every execution removes all nodes labeled `Chunk` before indexing the PDF again. Do not use the same database for data that must be retained.

### Technologies Used

- TypeScript and Node.js;
- LangChain;
- Hugging Face Transformers;
- Neo4j Community Edition and APOC;
- OpenRouter;
- Docker Compose.