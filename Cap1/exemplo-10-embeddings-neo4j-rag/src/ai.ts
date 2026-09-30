// Importa a neo4j vector store do LangChain
import { type Neo4jVectorStore } from "@langchain/community/vectorstores/neo4j_vector";
// Importa o parser de saída de string do LangChain
import { StringOutputParser } from "@langchain/core/output_parsers";
// Importa o template de prompt de chat do LangChain
import { ChatPromptTemplate } from "@langchain/core/prompts";
// Importa a sequência de execução de runnables do LangChain
import { RunnableSequence } from "@langchain/core/runnables";
// Importa o modelo de chat OpenAI do LangChain
import { ChatOpenAI } from "@langchain/openai";

// Define tipos auxiliares para o log de depuração e parâmetros da classe AI
type DebugLog = (...args: unknown[]) => void;

// Define os parâmetros necessários para a classe AI
type params = {
    debugLog: DebugLog,
    vectorStore: Neo4jVectorStore,
    nlpModel: ChatOpenAI,
    promptConfig: any,
    templateText: string,
    topK: number,
}
// Define o estado da cadeia de execução da IA
interface ChainState {
    question: string;
    context?: string;
    topScore?: number;
    error?: string;
    answer?: string;
}
// Define a classe AI que gerencia a interação com o vector store e o modelo de NLP
export class AI {
    private params: params
    constructor(params: params) {
        this.params = params
    }

    // Realiza a busca de vetores relevantes no Neo4j vector store com base na pergunta do usuário
    async retrieveVectorSearchResults(input: ChainState): Promise<ChainState> {
        // Inicializa a busca no vector store
        this.params.debugLog("🔍 Buscando no vector store do Neo4j...");
        // Executa a busca de similaridade no vector store
        const vectorResults = await this.params.vectorStore.similaritySearchWithScore(input.question, this.params.topK);
        // Verifica se foram encontrados resultados relevantes no vector store
        if (!vectorResults.length) {
            // Se não houver resultados, registra um aviso e retorna um erro no estado da cadeia
            this.params.debugLog("⚠️  Nenhum resultado encontrado no vector store.");

            return {
                // Retorna o estado da cadeia com erro se não houver resultados
                ...input,
                error: "Desculpe, não encontrei informações relevantes sobre essa pergunta na base de conhecimento."
            };
        }

        // Extrai o score do melhor resultado encontrado no vector store
        const topScore = vectorResults[0]![1]
        // Registra o número de resultados encontrados e o score do melhor resultado
        this.params.debugLog(`✅ Encontrados ${vectorResults.length} resultados relevantes (melhor score: ${topScore.toFixed(3)})`);

        // Filtra os resultados com score acima de 0.5 e extrai o conteúdo das páginas
        const contexts = vectorResults
            .filter(([, score]) => score > 0.5)
            .map(([doc]) => doc.pageContent)
            .join("\n\n---\n\n");

        return {
            // Retorna o estado da cadeia com o contexto e o score do melhor resultado encontrado
            ...input,
            context: contexts,
            topScore,
        }
    }

    // Gera a resposta da IA com base no contexto obtido do vector store
    async generateNLPResponse(input: ChainState): Promise<ChainState> {
        // Verifica se há erro no estado da cadeia antes de gerar a resposta
        if (input.error) return input
        // Registra que a geração da resposta da IA está iniciando
        this.params.debugLog("🤖 Gerando resposta com IA...");
        // Prepara o prompt de resposta da IA com base no template e no contexto obtido
        const responsePrompt = ChatPromptTemplate.fromTemplate(
            this.params.templateText
        )
        // Cria a cadeia de resposta da IA com base no prompt e no modelo NLP
        const responseChain = responsePrompt
            .pipe(this.params.nlpModel)
            .pipe(new StringOutputParser())
        // Invoca a cadeia de resposta da IA com os dados preparados
        const rawResponse = await responseChain.invoke({
            role: this.params.promptConfig.role,
            task: this.params.promptConfig.task,
            tone: this.params.promptConfig.constraints.tone,
            language: this.params.promptConfig.constraints.language,
            format: this.params.promptConfig.constraints.format,
            instructions: this.params.promptConfig.instructions.map((instruction: string, idx: number) =>
                `${idx + 1}. ${instruction}`
            ).join('\n'),
            question: input.question,
            context: input.context
        })

        // Retorna o estado da cadeia atualizado com a resposta gerada pela IA
        return {
            ...input,
            answer: rawResponse,
        }
    }
    // Orquestra o fluxo completo de resposta à pergunta, incluindo busca vetorial e geração de resposta NLP
    async answerQuestion(question: string) {
        const chain = RunnableSequence.from([
            this.retrieveVectorSearchResults.bind(this),
            this.generateNLPResponse.bind(this)
        ])
        const result = await chain.invoke({ question })
        // Registra a pergunta e a resposta gerada pela IA
         this.params.debugLog("\n🎙️  Pergunta:");
        this.params.debugLog(question, "\n");
        this.params.debugLog("💬 Resposta:");
        this.params.debugLog(result.answer || result.error, "\n");

        return result

    }
}