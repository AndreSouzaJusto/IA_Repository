
**Cap.1 - Fundamentos de IA e LLMs**

    ***Módulo 1-Machine Learning , Deep Learning e IA***
        * IA:  
            - são algoritmos que aprendem com os dados que também tem nome.
            - refere-se a sistemas que podem se comportar de forma inteligente e aprender como humanos.
        * Machine Learning (ML): (Aprendizado de Maquina)
            - subarea de AI
            - entendem algoritmos para entender os padrões em dados e prever resultados
        * Deep Learning: é a base da IA
            -usa camadas de processamentos para analisar dados e tomar decisões mais inteligentes
            -Algoritmo que identificam os padrões em uma imagem e tomar decisões
        * Tensorflow: 
            -Tecnologia de ML aplicada em navegador.
            -Transferencia de Processo de refinamento: cria um refinamento a partir do que a maquina ja aprendeu     
        * Javascript:
            - Unica linguagem que permite processamento de ML direto no navegador
            - Pré-processamento
            - WEB 4.0: Navegador será o nosso Sistema Operacional ! Pode rodar LLM no navegador da maquina cliente !
            - Pode usar o python no NODE.JS
            - Futuro: 
        * Teachable Machine: Ferramenta da Google
            - Link: https://teachablemachine.withgoogle.com/
            - Visão computacional para reconhecimento de padrões com gestos, objetos e imagens
            - Leve, baixo processamento e executa direto no navegador      
            - Grava, treina e reconhece os padrões em tempo real.
            - E ainda exporta o modelo treinado de tensorflow como codigo HTML para sua pagina ou até microcontroladores (500kb) tipo arduino e ESP32 IOT
        * kaggle: 
            - Melhor base de dados de teste para treinamento de IA
            - Link: https://www.kaggle.com/
            - Estratégia: nunca enviar o dado ja treinado para gerar predição.
        

    ***Módulo 2 - Conceitos de redes neurais e como elas se aprendam***
        
        *Tensores:* 
            - são vetores ou listas em javascript
            - sao representados por números para serem utilizados por algoritmos
            - Tensor não entende objetos e sim numeros pra transformar em padrões
            - Cria um array/matriz multidimensionais de categoriação onde 1 é verdadeiro e 0 falso.
            - Dados numericos tipo idade gera problema e exige normalização/conversão de dados via função de ativação.
        *Treinar redes neurais:*
            - Significa transformar os dados de testes em tensores e normalizar/converter  para trabalhar entre 0 e 1.
            - ONE HOT TAKE: Em Machine Learning, o termo correto é One-Hot Encoding (geralmente traduzido como codificação one-hot), e não "one hot take": Trata-se de uma técnica de normalização fundamental de pré-processamento de dados usada para transformar variáveis categóricas (como cores, estados civis ou categorias de produtos) em um formato numérico que os algoritmos de aprendizado de máquina e redes neurais conseguem processar.
            - Primeira camada de modelo (HIDDEN LAYER/CAMADA OCULTA): Aprende relações entre os dados de entrada através de pesos internos calculados de cada neuronios utilizados.
            - Segunda camada de modelo (OUTPUT LAYER/CAMADA DE SAIDA): Diz a chance de acertar qual é a categoria transformando tudo em probabilidade de acerto.

        * Pasta: exemplo-00 - Demonstração Tensorflow e seu exemplo de modelo de treinamento
            - instalar package e o node
                - npm init -y 
                - npm i @tensorflow/tfjs-node@4.22
            - configurar package.json:
                - incluir types:module e excluir outro key duplicado: type. 
                -  "start": "node --no-warnings --watch index.js"   
            - Para executar: node index.js
            - Para executar modo automatica: npm start    
            - Para corrigir/instalar versão correta do node 22 caso incompatibilidade:  nvm install 22
            - Para setar versão node correta no ambiente caso incompatibilidade:  nvm use 22
            - Para renomear como node 22 como padrão: nvm alias default 22

    ***Módulo 3 -Como funciona sistema de recomendação***

        * Threading: Todo processamento da rede neural vai acontecer em segundo plano e o processo principal do navegador vai ser
          responsável apenas por atualizar os dados
        
        * Pasta: exemplo-01 : Sistema de recomendação Ecommerce
        
            - Copiar o template direto da fonte dsiponibilizado pelo autor
            - executar npm ci para recuperar os pacotes deste ambiente recem recuperado.
            - comando debugger para depurar javascript no tools debuguer navegador
            
    *** Módulo 4 - Como vencer qualquer jogo
        * Pasta: exemplo-02: DuckHunter-JS
            - cd /exemplo-02/DuckHunter-JS
            - Certificar qual é a versão corrente do node instalado locamente: node -v
            - Executar npm ci para restaurar as dependencias deste projeto
            - Para executar o projeto em um navegador: npm start   

            - Habilitar o acelerador gráfico do chrome: chrome://settigs/system 

    *** Modulo 5
        
        * Algorimos Genéticos
            - Aprendizado por reforço (Reinforcement Learning): Algoritmo aprende a tomar decisões por tentativa e erro é recompensado por cada acerto.
            - Algoritmo Geneticos: Fazema  busca por população
        - Como funcionam LLM: transformers, embeddings ,attention
        - LLM: Large Language Model
            - ChatGPT é um LLM
            - É um modelo treinado com grande quantidade de texto para entender e gerar linguagem humana
            - GPT (Generative Pre-trained Transformer): 
                - Generative: Está ligado ao processo de geração de texto token por token. - Pre trained: antes de virar assistente, ele é treinado com uma quantidade enorme de texto para aprender padrões gerais da linguagem. 
                - Transformer:é a arquitetura usada por dentro , famosa por conseguir "prestar atenção" em partes importantes do texto (attention)
            - LLM pensa como pedaços de palavras, isto é: ela trabalha com tokenização onde o texto é quebrado em tokens unidade numérica (ela não trabalha com letra ou palavras como humano). 
            - Tokenização: Muitas palavras correspondem a um único token, mas algumas não: indivisível. Carateres unicode como emojis, podem ser divididos em vários tokens contendo bytes subjacentes. Sequencia de caracteres comumente encontrados uns dos outros podem ser agrupados: 1234567890. 
            Dica: Quantidade de tokens é sempre maior que todas as palavras existente em um texto. Cada palavra vira um vetor de palavras. 
            - Embeddings: Rrepresentam palavras como vetores, e a posição desses vetores é moldada pelo contexto semântico: palavras que aparecem em contexto parecidos, ficam próximas. Ela Capturam similaridade e relacionamento entre termos. Ex: Medico e hospital, embora não são mesma coisa porém são associados devido ambiente de trabalho. Embeddings aprendem a prever uma palavra que está faltando e prevêem quais palavras costumam aparecer perto. Elas criam representações internas e próximas ou seja, as relações recorrentes viram direções no "espaço". Ou seja, relações freuentes viram espécies de lugar consciente no espaço: Ex: Realeza: Rei (masculino) = Rainha (feminino). Operações comuns: Singular-Plural, Gênero, capital-País
            - Transformer: Processa o contexto. Ela recebe os tokens através da etapa anterior e processa as partes mais importantes para prever o próximo token e a arquitetura de rede neural utiliza a sequencia de decisão chamado ATTENTION para decidir quais partes do contexto são relevantes para interpretar ou gerar cada token. Ele é o "cerebro" do LLM. Transformer resolveu o problema inicial da rede neural para analisar todos os tokens de uma vez (paralelo) e permitir relações diretas entre tokens distantes via ATTENTION.
           - Fluxo da transformação LLM: Texto -> Tokens - > Vetores 
           - Transformers utilizam tambem SELF-ATTENTION: cada token pode olhar nos outros tokens da mesma frase e decidir o que importa através de pesos diferentes para cada um deles. Ex: "O gato deitou no tapete porque estava cansado." Quem deitou ? O gato ! Pois possui maior peso em relação ao tapete apesar do tapete estar mais próxima na palavra: cansado.
           - Multi-head Attention: várias "cabeças" são executadas em paralelo ou seja, cada "cabeça" aprende um tipo de relação:
                - concordância gramatical ou sintaxe
                - referência (ela aponta para quem)
                - relação entre tópico e detalhes
                - padrões de código (abrir/fechar chaves, chamadas , imports)
            - Transformer dá um contexto do próximo token depois que ele aprendeu para gerar possíveis respostas. Uma unica resposta contém uma lista de probabilidades para milhares de tokens possíveis. Ela escolhe um token em base dos parametros abaixo e anexa ao final do contexto na proxima rodada. Portanto o contexto cresce e cada ciclo vai aumentando o custo e tempo devido tokens excedentes.
                * Qto maior o prompt (mais tokens de entrada, mais trabalho para começar)
                * Qto maior a resposta (mais tokens gerados, mais iterações e mais custo)
                * Qto maior a janela de contexto, mais memoria o sistema precisa manter durante a geração.
            OBS: Alucionações não significa mentir e sim escolher o mais proximo de soar correto (mais provavel) em um contexto pobre/falta de dados repassado ao LLM. (suposição/ambiguidade)        
            - Parametros dos LLM mais comuns são:  
                - Temperatura (ex: 0.2): controla o grau de aleatoriedade na seleção de tokens. Temperatura mais baixo exigem resposta mais deterministica/previsível ou menos aberta OU temperatura mais alta levam a respostas mais aleatórios ( método greedy :"famoso alucinatório/ganancioso") O algoritmo constrói a solução peça por peça, escolhendo sempre a alternativa que parece mais vantajosa, lucrativa ou imediata no momento, sem olhar para as consequências de longo prazo. Temperatura não é criatividade humana e sim só ajusta o grau de aleatoriedade na escolha no próximo token.
                - TopK: O Top-K é um parâmetro de amostragem fundamental em Modelos de Linguagem Grande (LLMs) que controla a diversidade e o foco na geração de texto, atuando logo após o modelo calcular as probabilidades para o próximo token. O parâmetro K define que apenas os K tokens mais prováveis serão mantidos para consideração.Descarte do restante: Todos os outros tokens (que ficam fora do Top-K) têm sua probabilidade zerada instantaneamente. A escolha final do próximo token é sorteada apenas entre esses K sobreviventes. Ex: "O céu está..." e as previsões com maiores probabilidades são:
                        Azul (70%)
                        Nublado (15%)
                        Estrelado (8%)
                        Cinza (5%)
                        Claro (2%)
                    Se você configurar Top-K = 1: O modelo se comporta de forma estritamente determinística (equivalente ao greedy decoding puro), escolhendo sempre o primeiro (Azul).

                    Se você configurar Top-K = 3: O modelo descarta todos os tokens abaixo do 3º lugar e sorteia a próxima palavra escolhendo estritamente entre Azul, Nublado e Estrelado.'
                - TopP: Enquanto o Top-K fixa um número absoluto de palavras (ex: as 40 melhores), o Top-P filtra dinamicamente com base na soma das probabilidades (ex: manter apenas as palavras cuja soma de probabilidade atinja 90% (0.9 singifica que é realizada a soma de todas as lista de tokens até atingir 0.9)). 
                    - Referência comuns:
                        - Codigo Técnica: 0.2 a 0.4
                        - Tarefas comuns: 0.7 a 1.0 (balanceia criatividade)
                        - Escrevendo textos: > 1.0 (Palavras mais variadas)
            - Web AI: Aka JEMMA Nova ferramenta de IA da Google - Evolução da web inteligente
                - Breve: WEB MCP para integrar terceiros diretamente no navegador !

            - Configuração de extensões do Chrome: chrome://flags/
                - Buscar por Gemini e habilitar todas as extensões de uso das APIS deste IA

        * Pasta: exemplo-03: Web AI
            - Instruções para IA Integrada Link:  https://developer.chrome.com/docs/ai/get-started?hl=pt-br
            - 
        
    *** Modulo 6 - 
        * Prompts
            - Dica para montar um prompt eficiente: Precisa detalhar/refinar o maximo possivel para conseguir uma tarefa completa com apenas uma chamada.
            - Resposta mal formulada significa:
                - falta de contexto pré alimentada. 
                - Excesso de ambiguidade ou seja deixar 2 interpretações. Usar Dica: usar o bloco 4
            - Estrutura de prompt em 10 blocos organizadas para montar um contexto consistente antes de responder pergunta de usuários.
                - Bloco 1 - Contexto de Tarefas: Papel do persona principal /pauta do assunto
                - Bloco 2 - Contexto de tom: confiante/cauteloso/excessivo - Impressão de falsidade/inverdades
                - Bloco 3 - Dados de antecedentes, documentos e imagens: Dados de Entrada / Contexto Técnico (Input Data / Sources): O material base sobre o qual a IA   vai trabalhar (código, texto original, dados JSON, documentos em anexo). Servirão de base de referência antes de responder ao usuário.
                - Bloco 4 - Descrição detalhada da tarefas e regras: Espécie de contrato operacional.  A instrução direta e sem ambiguidade do que a IA precisa realizar (ex: "Crie uma função para refatorar o código abaixo"). Ajuda a evitar alucinações com respostas consistentes.
                - Bloco 5 - Exemplos: (Few-Shot Examples / In-Context Learning): Exemplos práticos de entradas e saídas esperadas para guiar o padrão do resultado. Nelas contém os niveis de detalhes, formatos de entradas e saida de respostas
                - Bloco 6 - Histórico de conversas:  Refinamento histórico de texto para evitar , ao maximo, o envio de todo texto a cada pergunta. (Poupa menos token)  
                - Bloco 7 - Descrição ou pedido imediato: Serve para dar contexto e ajuda a definir respostas mais precisas/consistentes ao pedido.
                - Bloco 8 - Passo a Passo: Instruções Detalhadas e Passos (Detailed Steps / Execution Plan): O passo a passo do raciocínio ou processo que a IA deve seguir para executar a tarefa para responder ao usuario. (Como vc responde ao usuario?)
                - Bloco 9 - Formatação da saída: Formato e Estrutura da Saída (Output Format / Schema): Especificação exata do formato da resposta (ex: "Responda estritamente em formato JSON", "Use tabelas Markdown e 3 tópicos principais").
                - Bloco 10 - Resposta pre preenchida: Modelos/PAdrões de resposta pre definida. Ex: Formato de JSON com tuplas especificas. Etapa mais importante.
        * Padrão TOON e JSON para Prompts
            - LLM usa dados estruturados para processar/integrar serviços.
            - JSON PROMPT: Formato padrão de JSON PROMPT para LLM
            - JSON PROMPT ajuda a fornecer especificações mais previsíveis (basedas nas 10 regras acima) para integrar ao código. 
            - Escalabilidade: Prompts viram "config" , isto é, tratar o promtp como configuração versionável. Ex: definição de rota como area de suporte ou de financeira, etc. Ajuda até gerar prompts dinâmico de forma automatica. 
            - JSON Pura pode gasta mais tokens pois o prompt pode crescer devido novas regras, entradas, saidas, formatos recentes,etc.
            - JSON ajuda a reduzir o retrabalho ("responde de novo, agora no formato certo"), reduz mensagens de correção ("não era isso, eu quis tal coisa"), e evita respostas longas/erradas que queimam tokens. Ela ajuda a economizar tokens indiretamente, dividindo idas e voltas
            - Regras para estruturação de JSON PROMPT:
                1- Meta:Nome/Versão do prompt, Idioma, objetivo
                2- Role: Papel do interlocutor (ex: especialista, revisor, tutor)
                3- Context: Dados que o modelo precisa saber
                4- Task: o que exatamente fazer
                5- Constraint: limites e regras, (não inventar, não extrapolar, etc)
                6- Output: formato de saida e validação
            - Principais travas do JSON:
                - do_not_invent:true
                - if_missing_data:say_you_dont_know
                - cite_source_fields:[context.source]
                - allowed_assumptions:[]
                - constraints:{ uncertainty_policy:"Se não estiver certeza, diga 'não tenho dados suficientes' e peça o campo faltante"} 
            - Uso da ferramenta de JSON SCHEMA ou Zodio para validar/forçar o modelo a pensar antes.
            - JSON PROMPT ajuda a definir o mais proximo deterministico e da reutilização dos prompts gerando saídas mais previsíveis.
            - Evitar criar JSON PROMPTS poéticos isto é, inflado e cheio de ruído. (Menos é mais)
            - TOON: Token Oriented Object Notation
                - Nova onda para gastar menos token
                - Modelo mental do JSON que representa objects, array e valores , só que com menos pontuação.(aspas, colchetes, virgulas,etc). Foco: token enxuto e eficiente com estilo mais compacto 
                - Ideal para construir "JSON BEM PENSADO" com campos curtos, representação tabular com cols/rows, remover redundância, evitar texto desnecessário, etc.

    *** Modulo 7 - 
        Historia Cursor/VSCode/Outros IDE
            - VS é a base (fork) de Cursor
            - Lema importante: Usar IA para acelerar , mas trate a saída como não confiável
            - Confiar e conferir sempre: 
                - Revisão
                - Testes
                - Politicas
                - Escopo
                - Segurança
                - Observabilidade  
        Agentes de IA: 
            - É o motor/orquestrador de decisão de IA. Um agente de IA é um sistema computacional baseado em Inteligência Artificial que não apenas gera textos ou respostas passivas, mas possui autonomia para atuar em direção a um objetivo determinado, percebendo o ambiente, planejando ações e utilizando ferramentas para executar tarefas complexas. Enquanto um modelo de linguagem tradicional (LLM) atua de forma imediata (recebe uma entrada e devolve uma saída única), o agente funciona como um "orquestrador": ele analisa o problema, decide quais passos intermediários são necessários e executa cada um até alcançar o resultado esperado.
            - Agente de IA resolve problemas criando um ciclo controlado, isto é:
                - Objetivo ( o que o usuário quer), plano (como chegar lá), ações (rodar ferramentas, buscar mais contexto), Osbservações(ver resultados/logs/testes/erros), iteração (corrigir/repetir) e entrega final (com evidências e relatório final)
            - Agente Não precisa estar no editor
            - Para desenvolver agentes AI eficientes, precisa:
                1) Planejamento: Quebrar em etapas pequenas ou seja, cria um plano com passos aplicáveis
                    - Define o que é "pronto" (critérios de aceite)
                    - Escolhe a ordem de execução
                2) Seleção de ferramentas: Qual action resolve isso ? Ex: 
                    Preciso saber a estrutura de repositorio ? - ferramenta de busca de arquivos no diretório local
                    Preciso validar se compila ? - Ferramenta de terminal
                    Preciso entender API atualizada ? - Ferramenta de documentação
                    Preciso garantir padrão ? - Ferramenta para rodar script de linter e formatação
                    Preciso responder com base em dados ? - Ferramenta de integração com banco de dados
                3) Observação e iteração: Feedback é a verdade. Observa os testes para ser se está OK e coerente com a funcionalidade projetada. Ele aprende na marra: observa, age e tenta corrigir caso ocorra algum problema.
                4) Agentes são papéis: ideal um papel/especialidade/missão por agente
                    - Planner: Só planeja, não edita nada
                    - Implementer: edita código e roda testes
                    - Reviewer: lê diff e aponta riscos
                    - QA: valida contrato e fluxo ponta a ponta
                    - Dcos agent: escreve readme/changelog
                    - Ops agent: consulta observabilidade e sugere mitigação.
                - Exemplo: Agente Spec ideal (para dev) no github
                    - Contexto: onde isso roda, stack, constraints
                    - Requisitos: o que deve existir
                    - Não requisitos: o que não faz parte (evita feature creep)
                    - Critérios de aceite: como validar que terminou
                    - Contrato: shape de API, formatos de resposta
                    - Plano de teste: como verificar
                Fluxo de Processos de Agentes:
                    1) Primeiro a especificação (define contrato APi,interface de usuário minima,define validação)
                    2) Agente com papéis: Backend implementa API, FrontEnd  implementa UI e QA valida e gera checklist
                    3) Intgração: Rodar testes e validar

    *** Modulo 8
        
        - O que são MCP (Model Context Protocol)?
            - Anthropic introduziu MCP em 2024
            - MCP é um protocolo para conectar LLM ao mundo real
            - MCP Server são servidores de MCP que oferecem integrações externas (pacotes prontos para plug-in)
            - Existem varios tipos de pacotes MCP prontos: acesso banco de dados, gerador de emails (RESEND MCP Integration), etc
        - Um servidor de MCP expõe uma lsita de 3 itens importantes:
            - Lista de ferramantas (Tools): as ações que o modelo pode disparar. (Similarmente na API temos o endpoint) 
            - Lista de recursos (resources): recursos existentes 
            - Lista de prompts: Templates de prompts pre definidas que usam 1 ou mais ações/tools
        - LLM não vê servidores de MCP e sim uma lista de ferramentas, nomes, descrições , esquema de parametros que o cliente host montou a partir dos servidores de MCP
        - Exemplos: Mapa mental de ações/tools
            - MCP "filesystem"
                * tool:read_file(path) -> Ler um arquivo
                * tool: list_dir(path) -> Listar um diretório   
            - MCP "git"
                * tool: diff() -> compara branchs
                * tool: status() -> verificar a situação do branch 
            - MCP "db"
                * tool: run_query(sql) -> executa uma query
        - Como LLM escolhe/executa a MCP?
            - Não existe IF/ELSE dentro do modelo e sim um comportamento aprendido
            - Decide pelo nome e descrição da Tool da MCP
            - MCP deixa de ser só texto e vira um operador de ferramentas padronizado               

        * Pasta: exemplo-04-playwright Teste via Terminal
            - Instalar a extensão Playwright Test for VS Code
            - Instalar MCP Playwright : @mcp Playwright
            - Consultar no Built In: MCP Playwight instalado do VSCODE e suas ferramentas: Clicar Configuration Tools situado no chat do IA
            - Executar o prompt generate-tests.md e generate-test.promtp.md para disparar o teste usando MCP Playwright
            - Opção: execução manual 
                >npm test (EXecuta o plano de teste)
                >npm playwright show-report  (Visualiza o resultado)

        * Pasta exemplo-04-playwrightMCP: Teste via MCP
            - Instalar MPC Gihub: @mcp github
            - Através do Built-in: selecione o MCP Github que vai abrir mcp.json
            - Colar configuração do MCP PlayWrigth no mcp.json. Link: https://github.com/microsoft/playwright-mcp/tree/main
            - Instalar a extensão do chrome web store no mcp playright: https://github.com/microsoft/playwright/tree/main/packages/extension#readme. "--extension" no mcp.json
            - Instalar extensão do chrome: Playwright MCP Chrome Extension e executar para obter o token Id : 

            - Ativar o modo desenvolvedor no Chome via chrome://extensions/
            - Executar o server MCP Playwright para testar (OBS: Se estiver outro MCP Playright ativado, desative-o)

        * Contexto Seven (7): Link: https://context7.com/
            - O Context7 é um servidor MCP (Model Context Protocol) desenvolvido pela Upstash que fornece documentação atualizada e específica por versão de mais de 2.000 bibliotecas diretamente para assistentes de IA e editores de código. 
            - O Context7 busca exemplos de código e documentação atualizados diretamente no contexto do seu LLM. Sem precisar alternar entre abas, sem APIs inexistentes e sem geração de código desatualizado.
            - Vantagens: Mantem o estado-da-arte de contexto ou seja sempre atualizado após o tempo.
            - Sem context7: Você cola blocos enormes de docs no prompt, manda links e pede: use isso e reexplica o setup inteiro a cada tentativa. Assim gasta mais tokens e custo.
            - Com context7: VOcê apenas manda a intenção (Crie um CRUD em Node.js, integre o Prisma+Postgresql e use context7), o agente chama context7 , traz trechos curtos e precisos e só gera o código com base na doc atual. Assim resulta menos tokens no prompt inicial e maior economia atavés de menos tentativas e correções. Código fica mais alinhado na versão correta.
            
            * Exemplo de projeto: Uso de next.js com context7 https://context7.com/vercel/next.js


        * pasta 5 - Context7:
            - Criar uma API KEY do context7 (grátis): ctx7sk-1e54df5a-36c9-4f61-966c-b4e02e010c8a
            - Instalar o MCP do Context7 no VSCode e testar se OK
            - Copia/colar o prompt.md no chat e ainda complemente-o: Criar o projeto na mesma pasta do prompt.md
            - Esperar o MCP rodar/criar a pasta até o final
            - Apos terminar de montar o ambiente, é necessário configurar o OAuth Apps na sua github para permitir conexão conforme instruções no prompt: Abrir o github - https://github.com/settings/developers 
            - Criar um novo OAuth APP: Demo pos conforme instruções no README.MD na pasta do projeto. Apos criar o OAuth, copie o Client ID e Client SECRET gerado pelo github e cole no arquivo .env 
            - cd \repositorio_justo\Cap1\exemplo-05-context
            - executar: 
                npx @better-auth/cli migrate
                npm run dev

        * Observabilidade:
            - Telemetria como fonte de dados
            - IA para cruzar traces, logs e métricas das endpoints para chegar à uma conclusão sólida a fim de encontrar bug de forma mais rápida.
            - OpenTelemetry: Padrão aberto/Universal
            - Ferramenta de Dashboard Prometeus/Grafana: métricas, logs e alertas.
        
        - Exemplo-6-grafana: Uso de MCP Grafana para Observabilidade
            - Copiar a pasta alumnus do repositório (scalfolding) e incluir dentro da pasta do atual projeto exemplo-6-grafana
            - dentro da pasta alumnus/infra, executar o comando para criar um ambiente docker com postgresql, grafana tudo pronto: docker-compose -f docker-compose-infra.yaml up --wait
            - Apos a criação sucessiva do docker, abrir o arquivo docker-compose-infra.yaml para pegar o URL do servidor da grafana: localhost:3000
            -Abrir o box no dashboard: HTTP MEtrics OpenTelemetry para visualização de várias metricas que não vai aparecer nenhum dados. (NEcessita instalação de outros modulos abaixo)
            - Voltar para pasta cd /alumnus/_Alumnus e executar: npm ci para instalar as dependencias
            - e executar npm start para iniciar a geração de logs automaticos para simulação
            - Enquanto continua criando os logs, abra o grafana para acompanhar em tmepo real.
            - Instalar o MCP Grafana Server no mcp.json do vscode local. Ver instruções de instalação no README.MD
            - Usar o /docs/prompt.md para investigar o motivo de erro que aparece no grafana pelo IA.
            - Abrir um outro VSCODE WINDOWS em branco, ou seja sem abrir a pasta do codigo fonte para testar o prompt.md (não esquecer de ativar o MCP Grafana na sessão !)
            - Rodar o prompt de diagnistico
            - Vai gerar um report de incidente na pasta /docs.

     *** Modulo 9
        - Modelos Abertos
            - LLM Modelo OpenSource significa sem censura. Consegue baixar open-weights (pesos do modelo) mas não consegue acessar as base de dados usados no modelo de treinamento ou pipeline de treino. 
            -  LLM Aberto significa downloavel, reproduzível  na maquina local tais como por exemplo ollama (simples), llama3 da meta (mais poderoso), gpt-oss (OpenAI), etc
            - Vantagens de modelos abertos (Open-weight):
                -> Custo pode cair ao invês de pagar provedor
                -> Privacidade e controle
                -> Customizável : Criação de modelos especialistas sem depender dos outros contextos
            - Desvantagens:
                -> Custos invisiveis da infraestrutura para IA: GPU, energia, refrigeração, manutencao, observabilidade, escalonamento, engenharia de distribuição, outros
                -> Uso restrito comerciais devido clausulas colocadas por fabricante do LLM
        - Modelos fechados (API):
            -  Vale a pena pagar quando se trata de projetos empresariais
            - Pagar ao HUB que distribui o dinheiro aos grupos OPENAI, GOOGLE, CoPilot e outros.
            - Maior liberdade para escolher aquele que mais adapta ao perfil e orçamento do projeto
            - Uso de orquestador de modelos
        - Ollama (Link: https://ollama.com/)
            - Fork da base da Meta
            - Otimo para projetos pessoais
            - Rapido e grátis
            - Capacidade multimodal: texto, imagem e arquivos que permitem modelo OCR
            - Oferece um catalogo enorme de modelos de código
            - Perfeito para provas de conceito, automações locais, scripts de produtividade, prototipos de criação de agentes de AI, estudos de modelos e quantização
            - Minimo 16GB de RAM e GPU sem gastar 1 centavo em token
            - Não é ideal para exeução em produção. Ele executa um prompt por vez e usa bastante o processamento da maquina local. Não é feita para vários clientes (Solução: uso do vLLM que iguala ao serviço de ChatGPT)
        - Caracteristicas de modelos:
            - Cada modelo oferece bilhoes de parametros (neurônios) que são pesos do modelo ou seja , o que ele realmente aprendeu. Qto mais parametros significa mais capacidade/qualidade
            - Memoria de curto prazo: tamanho de contexto tipo 4K, 32K, 128K e até 1M.
            - Context Window: Qtos tokens cabem na conversa de uma vez
            -  Mixture of Experts (MoE) é uma arquitetura de redes neurais desenvolvida para aumentar dramaticamente a capacidade (número de parâmetros) de um modelo de Inteligência Artificial sem elevar proporcionalmente o custo computacional por inferência.
            - Em modelos de linguagem tradicionais (conhecidos como Dense Models), todas as partes do modelo são ativadas para processar cada palavra ou token de entrada. No MoE (Mixture of Experts), a abordagem muda para a execução esparsa (Sparse Execution). A arquitetura substitui as camadas tradicionais de Feed-Forward Network (FFN) por dois componentes principais:
                * Especialistas (Experts): Várias sub-redes independentes (chamadas de "especialistas"), onde cada uma se especializa em processar diferentes tipos de padrões ou contextos (ex.: sintaxe, código, raciocínio lógico, idiomas específicos).
                * Roteador / Mecanismo de Gating (Router): Uma camada encarregada de analisar o token de entrada e decidir dinamicamente para qual(is) especialista(s) enviar a informação.
                Mixtral 8x7B (Mistral AI): Possui 8 especialistas de 7 bilhões de parâmetros cada. Embora o total acumulado chegue a ~47 bilhões de parâmetros, ele ativa apenas 2 especialistas por token (~13 bilhões de parâmetros ativos), mantendo uma inferência extremamente rápida.
                GPT-4 (OpenAI): Utiliza uma arquitetura MoE gigante com múltiplos especialistas internos para entregar alto desempenho em múltiplas tarefas.
            - Quantização: reduzir o tamanho do modelo trocando a forma como os pesos são representados (ex: 16 bits para 8 bits) para reduzir a precisão numérica usada para armazenar os pesos a fim de ocupar menos memória e rodar em recursos computacionais mais enxutos. Desvantagens: perda de qualidade
            - MLC-LLM: 
                * MLC (Machine Learning Compilation) refere-se a um conjunto de técnicas e ecossistemas de software projetados para automatizar e otimizar a conversão de modelos de aprendizado de máquina (Machine Learning e LLMs) em código executável eficiente, ajustado especificamente para diferentes tipos de hardware (GPUs, CPUs, SoCs de smartphones e chips dedicados).
                * Em vez de depender do envio manual de código para frameworks pesados em tempo de execução, o MLC aborda a implantação de modelos como um problema de compilação de software. O resultado final é compilado em binários leves e ultrarrápidos ajustados para a arquitetura-alvo (CUDA, Metal, Vulkan, OpenCL, WebGPU).
                * Permite rodar o mesmo modelo de IA em navegadores web (via WebGPU), celulares Android/iOS, computadores pessoais (Mac/Windows/Linux) e servidores de nuvem sem alterar a lógica principal.
                * Sufixo na nomenclatura significa perfil de quantização usado: Ex: 
                    -> q4 significa os pesos (weights) do modelo foram armazenados em 4 bits (modelo normal tem 16 bits)
                    -> f32 significa as ativações(tensores ou calculos intermediários durnte a inferencia) ficam em float32 (32 bits) enquanto o original era de float16
                    -> _1: um identificador interno da variante/receita de quantização usada pelo MLC (por exemplo, diferenças no algoritmo, calibração, esquema de pacotes,etc)
                    -> Quando maior precisão numerica, ajuda a preservar estabilidade numerica e qualidade em comparação com quantização de 4K
                * GPT-OSS-20B roda em cerca de 16GB em nossas maquinas comuns.
        - Ferramenta: Jan.ai
            -> OpenSource AI
            -> Completa como os outros modelos tipo ChatGPT, Claude, Gemini
            -> Oferece hub de vários modelos inclusive MCPs

        Exemplo-7-ollama:
            - request.sh: Comandos para instalar modelos ollamas e gerar requisições curl para obter respostas via terminal
            - 
        - OpenRouter:
            - Orquestrador de vários IA
            - Oferece uma porta unica e padronizada para integrar centenas de modelos de vários provedores diferentes para um unico endpoint com compatilidade 100%
            - Oferece recurso de fallback automatico, ou seja, se um modelo der problema, ele tenta outro modelo. E alem disso, procura a melhor roteamento baseado por custo/latencia/throwput e outras regras definidas pelo usuario.
            - Gera cobrança consolidada, você compra 1 assinatura e pode trocar de provedor sem necessidade de comprar mais de 1 assinatura especifica por provedor
            - Sua Aplicação ganha flexibilidade para inetgrar com vários provedores com apenas uma API através de sua configuração.
            - OpenRouter oferece modelos gratuitos e pagos
        exemplo-08-openrouter
            - sh request.sh -> executa o script padrão bash

    *** Modulo 10 - O que é RAG ?
        - RAG(Retrieval Augmented Generation )
            -> É um padrão de busca de informações relevante, documentos, PDFs, banco de dados,etc e injeta esses trechos no contexto
            -> Memoria paramétrica (o que o modelo sabe nos parametros)
            -> Memoria não-parametrica (um indice externo pesquisavel tipicamente um indice vetorial)
            -> RAG faz a LLM responder com fatos atualizados, que ajudam a reduzir alucinações e aumentando precisão.
            -> RAG coloca os fatos certos no contexto antes da operação
        - Transformers:
            -> Dado um contexto (seu prompt + historico + trechos de ferramentas), o modelo prediz o proximo token
            -> Embedding é transformar um texto em um vetor numérico (um array de floats) onde textos com significados parecidos viram vetores próximos que são processados em duas fases:
                -> indexação: Todos os contextos em pdf, texto,etc são quebrados em chunk coerentes
                -> consulta: através de chat, você faz uma pergunta baseada em contexto e ela faz a busca de respostas próximas/similares à pergunta e retorna os proximos tokens.
            -> Embeddings permite buscar esses fatos por similaridade de sentido (não só palavra igual) e um banco de dados para recuperar (e até deduplicar conhecimento). Ela não é o "keyword".   
        -> Com o RAG: você injeta os trechos certos no momento da pergunta, sem precisar ensinar o modelo para sempre.
            -> Ele transforma pergunta em embeddings
            -> Busca por similaridade de cada fonte
            -> Pega os top-k pedaços parecidos/relevantes
            -> Pode aplicar filtros e rerankings
            -> Injeta esses pedaços no prompt fazendo o LLM respondendo contextos baseada em evidência, por exemplo recuperando pedaços do runbook (pool de conexões)
        Diferença entre MPC e RAG: Confusão
            -> Dois acabam aumentando o contexto que a LLM enxerga porém cada um deles executam e resolvem problemas bem diferentes.
            -> RAG: busca a resposta antes de responder com foco de trazer conhecimento certo, atualizado ou privado.
            -> MCP: Protocolo de integração que expõe capacidade para o modelo, ela padroniza as ações das ferramentas externas. As ações que podem ser executadas (rodar testes, buscar docs, consultar Grafana, integrar recursos). Ela pluga capacidades e fontes ao agente/editor.
            -> RAG: Precisa de um canal para buscar conteudo
            -> RAG é um comportamento enquanto MCP é o caminho
            -> RAG usa o MCP como infraestrutura
            -> Quando o MCP não tem nada a ver com RAG ? Quando o MCP executa ações que não são recuperação de conhecimento. Ex: Rodar testes, abrir um pull request, criar um relatório de performance, fazer um deploy de um serviço. Uso de MCP como "controle remoto" de automação/agente
        Fine-Tuning:
            -> Quando você pega um modelo ja treinado e faz um treinamento adicional nele, usando exemplos do seu domínio, para ajustar os pesos do modelo sem precisar repetir as instruções toda vez.
            -> Fine-Tuning não é dar/mexer no cerebro. Ele é treinado com dataset generico, reconhece padrões visuais parecidos, formas e texturas, cores/contrastes, etc.
            -> Ele retreina a ultima camada da cabeça do classificador onde fica as classes finais e as vezes descongela só as ultimas camads do backbone para refinar detalhes e gera um novo modelo baseado da técnica de transfer learning: você não joga fora o que o modelo aprendeu; você reaproveita e só ajusta para uma tarefa mais especifica.
            -> Fine-Tuning não é dar contexto e sim está dando memória de curto prazo para aquela execução ou seja, ele busca trechos mais relevantes numa base
        
        Examplo-09-embedding-neo4:
            -> Busca por similaridade usando banco de vetores Neo4j.
            -> Ler o contexto da aula, quebrar o texto , grar embeddings e armazenar tudo no banco de vetores Neo4j para ser consultado posteriormente através de perguntas.
            -> Busca de similaridade - estratégia: Transforma cada pedaço do texto em um vetor (embedding), textos com significado parecido viram vetores próximos, ai você pergunta algo e o banco te devolve os top-k trechos mais proximos.
            -> Embedding é um resumo numérico do significado do texto. Embedding só captura as ideias parecidas através de relações (semantica) e o banco só precisa fazer a matemática e responder assim: "Esses pedaços aqui são mais proximos do que você perguntou" 
            -> Neo4J: é um database vector ou seja banco de dados baseados em grafos onde você guarda seus chunks (pedaços) como nós. Ela armazena embeddings como propriedades e cria um indice vetorial pra permitir busca por similaridade trazendo score e os topos resultados.
            -> TRansformer.js: biblioteca de javascript que processa modelos de AI localmente sem sequer precisar o ollama e torrar tokens. Ela gera embeddings localmente e armazena no banco de vetores (neo4j).
            -> Este exemplo mostra:
                * roda em Node.js
                * não precisa de chave
                * não precisa de Docker
                * não depende de cloud
                * você consegue reproduzir tudo do zero localmente na sua maquina.
            -> configurar .env 
            -> executar npm ci para instalar todas as dependencias.
            -> executar caso ocorra problema com docker:
                sudo usermod -aG docker "$USER"
                newgrp docker 
                docker ps
            -> npm run infra:up -> para criar/subir um ambiente docker com container neo4j com sucesso.
        
            -> Testar neo4j: http://localhost:7474/browser/
            -> npm run dev para executar o ambiente
            
            -> npm run infra:down -> para desligar um ambiente docker com container neo4j aberto.

        Exemplo-10-embedding-neo4j-rag: 
            -> realizar a copia da pasta anterior com subpasta neo4j, import e nodes_modules deletado
            -> npm ci 
            -> npm run infra:up -> para criar/subir um ambiente docker com container neo4j com sucesso.
            -> npm run dev
            -> Testar neo4j: http://localhost:7474/browser/ com username: neo4j e password: password. Selecionar node labels: chunk 
            -> Criar KEY API no OpenRouter para teste 















                