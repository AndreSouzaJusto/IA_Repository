import { buildLayout } from "./layout";

export default async function main(game) {
    // cria o layout do jogo e o container da IA
    const container = buildLayout(game.app);
    // cria o worker que vai executar a IA em um thread separado
    const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

    // desabilita o cursor do jogador, pois a IA vai controlar o mira do jogo
    // o cursor do jogador será substituído pelo cursor da IA
    game.stage.aim.visible = false;

    // inicializa o cursor da IA
    worker.onmessage = ({ data }) => {
        // trata as mensagens recebidas do worker (IA)
        // extrai os dados da mensagem recebida
        const { type, x, y } = data;

        // verifica o tipo da mensagem recebida
        // se a mensagem for do tipo 'prediction', atualiza a posição do cursor da IA e dispara o clique no jogo
    
        if (type === 'prediction') {
            // atualiza a posição do cursor da IA com os dados recebidos
            console.log(`🎯 Alvo detectado pelo IA: (${x}, ${y})`);
            // atualiza o HUD do container com os dados recebidos
            container.updateHUD(data);
            // torna o cursor da IA visível no jogo
            game.stage.aim.visible = true;
            // atualiza a posição do cursor da IA no jogo
            game.stage.aim.setPosition(data.x, data.y);
            // obtém a posição global do cursor da IA no jogo
            const position = game.stage.aim.getGlobalPosition();

            // dispara o tiro no jogo na posição do cursor da IA retornado anteriormente
            game.handleClick({
                global: position,
            });

        }

    };

    // envia periodicamente a imagem do jogo para o worker (IA) processar
    setInterval(async () => {
        // extrai o canvas do jogo e cria um bitmap para enviar ao worker (IA)
        const canvas = game.app.renderer.extract.canvas(game.stage);
        // cria um bitmap a partir do canvas para enviar ao worker (IA)
        const bitmap = await createImageBitmap(canvas);

        // envia a imagem do jogo para o worker (IA) processar
        worker.postMessage({
            type: 'predict',
            image: bitmap,
        }, [bitmap]);

    }, 200); // every 200ms

    return container;
}
