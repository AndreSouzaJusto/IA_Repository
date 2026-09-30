// DocumentProcessor é responsável por carregar e dividir documentos PDF em chunks de texto.
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
// Importa o carregador de PDFs da comunidade LangChain.
// Importa o divisor de texto recursivo da LangChain.
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
// Importa o tipo de configuração do divisor de texto.
import { type TextSplitterConfig } from './config.ts'

// Classe responsável por processar documentos PDF, carregando-os e dividindo-os em chunks de texto.
export class DocumentProcessor {
    private pdfPath: string
    private textSplitterConfig: TextSplitterConfig

    // Construtor da classe, recebe o caminho do PDF e a configuração do divisor de texto.
    constructor(pdfPath: string, textSplitterConfig: TextSplitterConfig) {
        this.pdfPath = pdfPath
        this.textSplitterConfig = textSplitterConfig
    }

    // Carrega o PDF e divide seu conteúdo em chunks de texto.
    async loadAndSplit() {
        // Cria uma instância do carregador de PDFs e carrega o conteúdo do PDF.
        const loader = new PDFLoader(this.pdfPath)
        // Aguarda o carregamento do conteúdo do PDF.
        const rawDocuments = await loader.load()
        console.log(`📄 Loaded ${rawDocuments.length} pages from PDF`);

        // Cria uma instância do divisor de texto recursivo com a configuração fornecida.
        const splitter = new RecursiveCharacterTextSplitter(
            this.textSplitterConfig
        )
        // Divide os documentos carregados em chunks de texto usando o divisor configurado.
        const documents = await splitter.splitDocuments(rawDocuments)
        // Retorna os documentos processados com seus metadados.
        console.log(`✂️  Split into ${documents.length} chunks`);

        // Mapeia os documentos para incluir apenas os metadados relevantes.
        return documents.map(doc => ({
            ...doc,
            metadata: {
                source: doc.metadata.source,
            }
        }))
    }
}