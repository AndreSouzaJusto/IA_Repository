// Importa do módulo @huggingface/transformers e do Node.js fs para leitura de arquivos
import type { DataType, PretrainedModelOptions } from "@huggingface/transformers";
// Importa a função readFileSync do módulo fs do Node.js para leitura de arquivos
import { readFileSync } from 'node:fs'

// Define a pasta onde estão os prompts e os arquivos de prompts específicos
const promptsFolder = './prompts';
const promptsFiles = {
    answerPrompt: `${promptsFolder}/answerPrompt.json`,
    template: `${promptsFolder}/template.txt`,
};

// Define a interface de configuração do TextSplitter
export interface TextSplitterConfig {
    chunkSize: number;
    chunkOverlap: number;
}
// Define a configuração geral da aplicação, incluindo prompts, saída, Neo4j, OpenRouter, PDF, TextSplitter, embeddings e similaridade
export const CONFIG = Object.freeze({
    // Configuração de prompts e templates
    promptConfig: JSON.parse(readFileSync(promptsFiles.answerPrompt, 'utf-8')),
    templateText: readFileSync(promptsFiles.template, 'utf-8'),
    // Configuração de saída de arquivos
    output: {
        answersFolder: './respostas',
        fileName: 'resposta',
    },
    // Configuração do banco de dados Neo4j
    neo4j: {
        // URL de conexão com o Neo4j (bolt://localhost:7687 por padrão no docker-compose)
        url: process.env.NEO4J_URI!,
        // Nome de usuário para autenticação no Neo4j
        username: process.env.NEO4J_USER!,
        // Senha para autenticação no Neo4j 
        password: process.env.NEO4J_PASSWORD!,
        // Nome do índice de vetores no Neo4j
        indexName: "tensors_index",
        // Tipo de busca no Neo4j (vetorial)
        searchType: "vector" as const,
        // Propriedades de texto nos nós do Neo4j
        textNodeProperties: ["text"],
        // Rótulo dos nós de texto no Neo4j
        nodeLabel: "Chunk",
    },
    openRouter: {
        // Configuração do OpenRouter
        nlpModel: process.env.NLP_MODEL,
        // Modelo de NLP utilizado pelo OpenRouter (definido na variável de ambiente NLP_MODEL)
        url: "https://openrouter.ai/api/v1",
        // URL base da API do OpenRouter
        apiKey: process.env.OPENROUTER_API_KEY,
        // Chave de API para autenticação no OpenRouter
        // Temperatura para geração de respostas pelo OpenRouter
        temperature: 0.3,
        // Número máximo de tentativas para requisições ao OpenRouter
        maxRetries: 2,
        // Cabeçalhos HTTP padrão para requisições ao OpenRouter
        defaultHeaders: {
            // Referer HTTP para requisições ao OpenRouter
            "HTTP-Referer": process.env.OPENROUTER_SITE_URL,
            "X-Title": process.env.OPENROUTER_SITE_NAME,
        }
    },
    // Configuração de arquivos PDF
    pdf: {
        // Caminho para o arquivo PDF a ser processado
        path: "./tensores.pdf",
    },
    // Configuração do TextSplitter
    textSplitter: {
        // Tamanho do chunk de texto
        chunkSize: 1000,
        // Sobreposição entre chunks de texto
        chunkOverlap: 200,
    },
    // Configuração de embeddings
    embedding: {
        // Nome do modelo de embeddings a ser utilizado
        modelName: process.env.EMBEDDING_MODEL!,
        // Opções pré-treinadas para o modelo de embeddings
        pretrainedOptions: {
            // Tipo de dado para os embeddings (fp32, fp16, q8, q4, q4f16)
            dtype: "fp32" as DataType, // Options: 'fp32' (best quality), 'fp16' (faster), 'q8', 'q4', 'q4f16' (quantized)
        } satisfies PretrainedModelOptions,
    },
    // Configuração de similaridade 
    // retorno de 3 melhores resultados
    similarity: {
        topK: 3,
    },
});
