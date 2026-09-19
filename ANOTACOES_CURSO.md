
**Cap.1 - Fundamentos de IA e LLMs**

***MODULO 01***


***MODULO 02***


    ***2-Machine Learning , Deep Learning e IA***
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
            - WEB 4.0
            - Pode usar o python no NODE.JS
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
        

    ***3-Conceitos de redes neurais e como elas se aprendam***
        
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

    ***4-Criando e treinamento minha primeira rede neural***

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

    ***5-Como funciona sistema de recomendação***

        * Threading: Todo processamento da rede neural vai acontecer em segundo plano e o processo principal do navegador vai ser
          responsável apenas por atualizar os dados
        

        * Pasta: exemplo-01 : Sistema de recomendação Ecommerce
        
            - Copiar o template direto da fonte dsiponibilizado pelo autor
            - executar npm ci para recuperar os pacotes deste ambiente recem recuperado.
            - comando debugger para depurar javascript no tools debuguer navegador
            


           
            

