
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









           
            

