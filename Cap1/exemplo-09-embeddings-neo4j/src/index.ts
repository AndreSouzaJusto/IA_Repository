// Ponto de entrada da aplicação que processa documentos PDF, gera embeddings e realiza buscas por similaridade usando Neo4j.
// Importa transformadores pré-treinados do Hugging Face e outras dependências necessárias.
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
// Importa a configuração da aplicação, o processador de documentos, o tipo de opções pré-treinadas, a base de dados de vetores Neo4j e utilitários de exibição de resultados.
import { CONFIG } from "./config.ts";
// Inicializa variáveis e funções auxiliares para manipulação dos documentos e do banco de vetores Neo4j.
import { DocumentProcessor } from "./documentProcessor.ts";
// Importa variáveis e tipos relacionados aos modelos pré-treinados do Hugging Face.
import { type PretrainedOptions } from "@huggingface/transformers";
// Inicializa a loja de vetores Neo4j e define funções auxiliares para manipulação de dados.
// Importa a base de dados de vetores Neo4j e define funções auxiliares para manipulação de dados.
import { Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector";
// Importa a função de exibição de resultados para mostrar os documentos mais relevantes encontrados na busca por similaridade.
import { displayResults } from "./util.ts";

// Variável global para armazenar a instância da banco de dados de vetores Neo4j.
let _neo4jVectorStore = null

// Função auxiliar para limpar todos os documentos existentes na base de dados de vetores Neo4j.
async function clearAll(vectorStore: Neo4jVectorStore, nodeLabel: string): Promise<void> {
    // imprime uma mensagem indicando que a remoção dos documentos está em andamento.
    console.log("🗑️  Removendo todos os documentos existentes...");
    // executa a consulta Cypher para remover todos os nós com o rótulo especificado.
    await vectorStore.query(
        `MATCH (n:\`${nodeLabel}\`) DETACH DELETE n`
    )
    // aguarda a conclusão da remoção dos documentos antes de prosseguir.
    //Exibe uma mensagem indicando que a remoção dos documentos foi concluída.
    console.log("✅ Documentos removidos com sucesso\n");
}


try {
    // Limpa todos os documentos existentes na base de dados de vetores Neo4j antes de adicionar novos documentos.
    // Exibe uma mensagem indicando que o sistema de embeddings com Neo4j está sendo inicializado.
    console.log("🚀 Inicializando sistema de Embeddings com Neo4j...\n");

    // Cria uma instância do processador de documentos com o caminho do PDF e a configuração do divisor de texto.
    const documentProcessor = new DocumentProcessor(
        CONFIG.pdf.path,
        CONFIG.textSplitter,
    )
    // Carrega e divide os documentos em chunks utilizando o processador de documentos.
    const documents = await documentProcessor.loadAndSplit()
    // Cria uma instância do modelo de embeddings utilizando as configurações definidas para treinamento.
    const embeddings = new HuggingFaceTransformersEmbeddings({
        model: CONFIG.embedding.modelName,
        pretrainedOptions: CONFIG.embedding.pretrainedOptions as PretrainedOptions
    })
    // const response = await embeddings.embedQuery(
    //     "JavaScript"
    // )
    // const response = await embeddings.embedDocuments([
    //     "JavaScript"
    // ])
    // console.log('response', response)

    // Cria uma instância da base de dados de vetores Neo4j a partir do grafo existente.
    _neo4jVectorStore = await Neo4jVectorStore.fromExistingGraph(
        embeddings,
        CONFIG.neo4j
    )

    // Limpa todos os documentos existentes na base de dados de vetores Neo4j antes de adicionar novos documentos.
    clearAll(_neo4jVectorStore, CONFIG.neo4j.nodeLabel)
    // Aguarda a conclusão da limpeza antes de prosseguir.
    // Adiciona os documentos à base de dados de vetores Neo4j.
    
    for (const [index, doc] of documents.entries()) {
        // Exibe uma mensagem indicando o progresso da adição dos documentos.
        console.log(`✅ Adicionando documento ${index + 1}/${documents.length}`);
        // Adiciona o documento atual à base de dados de vetores Neo4j.
        await _neo4jVectorStore.addDocuments([doc])
    }
    // Exibe uma mensagem indicando que todos os documentos foram adicionados com sucesso.
    console.log("\n✅ Base de dados populada com sucesso!\n");


    // ==================== STEP 2: RUN SIMILARITY SEARCH ====================
    // Executa buscas por similaridade utilizando as perguntas definidas.
    console.log("🔍 ETAPA 2: Executando buscas por similaridade...\n");
    // Define as perguntas que serão utilizadas para a busca por similaridade.
    const questions = [
        "O que são tensores e como são representados em JavaScript?",
        "Como converter objetos JavaScript em tensores?",
        "O que é normalização de dados e por que é necessária?",
        "Como funciona uma rede neural no TensorFlow.js?",
        "O que significa treinar uma rede neural?",
        "o que é hot enconding e quando usar?"
    ]

    // Itera sobre cada pergunta e realiza a busca por similaridade na base de dados de vetores Neo4j.
    for (const question of questions) {
        // Exibe a pergunta atual antes de realizar a busca por similaridade.
        console.log(`\n${'='.repeat(80)}`);
        // Realiza a busca por similaridade na base de dados de vetores Neo4j.
        console.log(`📌 PERGUNTA: ${question}`);
        // Exibe uma linha de separação antes de mostrar os resultados da busca por similaridade.
        console.log('='.repeat(80));

        // Realiza a busca por similaridade utilizando a pergunta atual.
        const results = await _neo4jVectorStore.similaritySearch(
            question,
            CONFIG.similarity.topK
        )
        displayResults(results)
        // console.log(results)
    }


    // ==================== STEP 3: CLEANUP ====================
    // Cleanup: Fecha a conexão com a base de dados de vetores Neo4j e realiza qualquer limpeza necessária.
    console.log(`\n${'='.repeat(80)}`);
    console.log("✅ Processamento concluído com sucesso!\n");

} catch (error) {
    // Exibe uma mensagem de erro caso ocorra algum problema durante o processamento.
    console.error('error', error)
} finally {
    // Fecha a conexão com a base de dados de vetores Neo4j e realiza qualquer limpeza necessária.
    await _neo4jVectorStore?.close();
}