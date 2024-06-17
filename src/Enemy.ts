import { CTX, CANVAS, CELL_SIZE, CELL_GAP, state, WINNING_SCORE } from './state';

export class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    movement: number;
    health: number;

    constructor(verticalPosition: number) {
        this.x = CANVAS.width;
        this.y = verticalPosition;
        this.width = CELL_SIZE - CELL_GAP * 2;
        this.height = CELL_SIZE - CELL_GAP * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
    }

    update() {
        this.x -= this.movement;
    }

    draw() {
        CTX.fillStyle = 'red';
        CTX.fillRect(this.x, this.y, this.width, this.height);
        CTX.fillStyle = 'white';
        CTX.font = '30px Helvetica';
        CTX.fillText(this.health.toString(), this.x + 5, this.y + 30);
    }
}

export function handleEnemies() {
    for (let i = 0; i < state.enemies.length; i++) {
        state.enemies[i].update();
        state.enemies[i].draw();
        if (state.enemies[i] && state.enemies[i].health <= 0) {
            const findThisIndex = state.enemyPositions.indexOf(state.enemies[i].y);
            state.enemyPositions.splice(findThisIndex, 1);
            state.enemies.splice(i, 1);
            state.numberOfResources += 10;
            i--;
            state.score++;
        }
        if (state.enemies[i] && state.enemies[i].x < 0) {
            state.gameOver = true;
        }
    }
    if (state.frame % state.enemiesInterval === 0 && state.score < WINNING_SCORE) {
        const verticalPosition = Math.floor(Math.random() * 5 + 1) * CELL_SIZE + CELL_GAP;
        state.enemies.push(new Enemy(verticalPosition));
        state.enemyPositions.push(verticalPosition);
        if (state.enemiesInterval > 100) state.enemiesInterval -= 100;
        console.log('enemy added ' + state.enemiesInterval);
    }
}
