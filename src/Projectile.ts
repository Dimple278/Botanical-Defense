import { CTX, CANVAS, CELL_SIZE, state } from './state';
import { collision } from './utilities/collision';
import { IProjectile } from './types';

export class Projectile implements IProjectile{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    power: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = 3;
        this.power = 20;
    }

    update() {
        this.x++;
    }

    draw() {
        CTX.fillStyle = 'black';
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        CTX.fill();
    }
}

export function handleProjectiles() {
    for (let i = 0; i < state.projectiles.length; i++) {
        state.projectiles[i].update();
        state.projectiles[i].draw();
        for (let y = 0; y < state.enemies.length; y++) {
            if (state.enemies[y] && state.projectiles[i] && collision(state.projectiles[i], state.enemies[y])) {
                state.enemies[y].health -= state.projectiles[i].power;
                state.projectiles.splice(i, 1);
                i--;
            }
        }
        if (state.projectiles[i] && state.projectiles[i].x > CANVAS.width - CELL_SIZE) {
            state.projectiles.splice(i, 1);
            i--;
        }
    }
}
