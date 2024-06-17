import { CTX, state, WINNING_SCORE } from './state';

export function handleGameStatus() {
    CTX.fillStyle = 'white';
    CTX.font = '30px Helvetica';
    CTX.fillText('Score: ' + state.score, 10, 35);
    CTX.fillText('Available resources: ' + state.numberOfResources, 10, 85);
    if (state.gameOver) {
        CTX.fillStyle = 'black';
        CTX.font = '110px Helvetica';
        CTX.fillText('GAME OVER', 120, 390);
    }
    if (state.score >= WINNING_SCORE && state.enemies.length === 0) {
        CTX.fillStyle = 'black';
        CTX.font = '60px Helvetica';
        CTX.fillText('YOU WIN with ' + state.score + ' points!', 130, 370);
    }
}
