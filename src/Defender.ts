import { CTX, CELL_SIZE, CELL_GAP,CANVAS, state, DEFENDER_COST } from './state';
import { collision } from './utilities/collision';
import { Projectile } from './Projectile';
import { FloatingMsg } from './FloatingMsg';

export class Defender {
    x: number;
    y: number;
    width: number;
    height: number;
    shooting: boolean;
    projectiles: Projectile[];
    timer: number;
    health: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = CELL_SIZE - CELL_GAP * 2;
        this.height = CELL_SIZE - CELL_GAP * 2;
        this.shooting = false;
        this.projectiles = [];
        this.timer = 0;
        this.health = 100;
    }

    draw() {
        CTX.fillStyle = 'blue';
        CTX.fillRect(this.x, this.y, this.width, this.height);
        CTX.fillStyle = 'white';
        CTX.font = '30px Helvetica';
        CTX.fillText(this.health.toString(), this.x + 5, this.y + 30);
    }

    update() {
        if (this.shooting) {
            this.timer++;
            if (this.timer % 90 === 0) {
                state.projectiles.push(new Projectile(this.x + 70, this.y + CELL_SIZE / 2));
            }
        }
    }
}

CANVAS.addEventListener('click', (e: MouseEvent) => {
    const gridPositionX = (e.clientX - state.canvasPosition.left) - ((e.clientX - state.canvasPosition.left) % CELL_SIZE) + CELL_GAP;
    const gridPositionY = (e.clientY - state.canvasPosition.top) - ((e.clientY - state.canvasPosition.top) % CELL_SIZE) + CELL_GAP;
    if (gridPositionY < CELL_SIZE) return;
    for (let i = 0; i < state.defenders.length; i++) {
        if (state.defenders[i].x === gridPositionX && state.defenders[i].y === gridPositionY) return;
    }
    if (state.numberOfResources >= DEFENDER_COST) {
        state.defenders.push(new Defender(gridPositionX, gridPositionY));
        state.numberOfResources -= DEFENDER_COST;
    }else {
        const mouseX = state.mouse.x ?? 0; 
        const mouseY = state.mouse.y ?? 0; 
        state.floatingMsg.push(new FloatingMsg("need more resources", mouseX, mouseY, 15, 'blue'));
    }
});

export function handleDefenders() {
    for (let i = 0; i < state.defenders.length; i++) {
        state.defenders[i].draw();
        state.defenders[i].update();
        if (state.enemyPositions.indexOf(state.defenders[i].y) !== -1) {
            state.defenders[i].shooting = true;
        } else {
            state.defenders[i].shooting = false;
            state.defenders[i].timer = 0;
        }
        for (let j = 0; j < state.enemies.length; j++) {
            if (state.defenders[i] && collision(state.defenders[i], state.enemies[j])) {
                state.enemies[j].movement = 0;
                state.defenders[i].health--;
            }
            if (state.defenders[i] && state.defenders[i].health <= 0) {
                state.defenders.splice(i, 1);
                i--;
                state.enemies[j].movement = state.enemies[j].speed;
            }
        }
    }
}
