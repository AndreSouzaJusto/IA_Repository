// Configurações e constantes utilizadas na aplicação.
// Este arquivo define a configuração da aplicação, incluindo Neo4j, OpenRouter, PDF, divisores de texto, embeddings e similaridade.
// Ele é utilizado para centralizar todas as configurações da aplicação em um único local.
// ele importa da biblioteca @huggingface/transformers os tipos necessários para configuração de modelos pré-treinados.
import type { DataType, PretrainedModelOptions } from "@huggingface/transformers";

// Configuração do divisor de texto utilizado para dividir documentos em chunks.
export interface TextSplitterConfig {
    chunkSize: number;
    chunkOverlap: number;
}

// Configuração geral da aplicação, incluindo Neo4j, OpenRouter, PDF, divisores de texto, embeddings e similaridade.
export const CONFIG = Object.freeze({
    // Configuração do Neo4j, incluindo URL, credenciais, índice, tipo de busca e propriedades dos nós de texto.
    neo4j: {
        url: process.env.NEO4J_URI!,
        username: process.env.NEO4J_USER!,
        password: process.env.NEO4J_PASSWORD!,
        indexName: "tensors_index",
        searchType: "vector" as const,
        textNodeProperties: ["text"],
        nodeLabel: "Chunk",
    },
    // Configuração do OpenRouter, incluindo modelo NLP, URL, chave de API e cabeçalhos padrão.
    openRouter: {
        nlpModel: process.env.NLP_MODEL,
        url: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
        temperature: 0.3,
        maxRetries: 2,
        defaultHeaders: {
            "HTTP-Referer": process.env.OPENROUTER_SITE_URL,
            "X-Title": process.env.OPENROUTER_SITE_NAME,
        }
    },
    // Configuração do caminho do PDF a ser processado.
    
    pdf: {
        path: "./tensores.pdf",
    },
    // Configuração do divisor de texto utilizado para dividir documentos em chunks.
    textSplitter: {
        // Tamanho máximo de cada chunk de texto.
        chunkSize: 1000,
        // Sobreposição entre chunks de texto consecutivos.
        chunkOverlap: 200,
    },
    // Configuração do modelo de embeddings utilizado para gerar vetores a partir dos chunks de texto.
    embedding: {
        modelName: process.env.EMBEDDING_MODEL!,
        pretrainedOptions: {
            // Tipo de dado utilizado pelo modelo pré-treinado.
            dtype: "fp32" as DataType, // Options: 'fp32' (best quality), 'fp16' (faster), 'q8', 'q4', 'q4f16' (quantized)
        } satisfies PretrainedModelOptions,
    },
    // Configuração da similaridade utilizada para determinar os chunks mais relevantes.
    similarity: {
        // Número de chunks mais relevantes a serem retornados.
        topK: 3,
    },
});
