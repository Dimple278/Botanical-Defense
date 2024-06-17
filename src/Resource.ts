import { CTX, CANVAS, CELL_SIZE, state, WINNING_SCORE } from './state';
import { collision } from './utilities/collision';

const amounts = [10, 15, 20];

export class Resource {
    x: number;
    y: number;
    width: number;
    height: number;
    amount: number;

    constructor() {
        this.x = Math.random() * (CANVAS.width - CELL_SIZE);
        this.y = Math.random() * (CANVAS.height - CELL_SIZE * 2) + CELL_SIZE;
        this.width = CELL_SIZE / 2;
        this.height = CELL_SIZE / 2;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];
    }

    update() {
        if (collision(this, state.mouse)) {
            CTX.lineWidth = 3;
            CTX.strokeRect(this.x + 3, this.y + 3, this.width - 6, this.height - 6);
        }
    }

    draw() {
        CTX.fillStyle = 'yellow';
        CTX.fillRect(this.x, this.y, this.width, this.height);
        CTX.fillStyle = 'black';
        CTX.font = '30px Helvetica';
        CTX.fillText(this.amount.toString(), this.x + 5, this.y + 30);
    }
}

export function handleResources() {
    for (let i = 0; i < state.resources.length; i++) {
        state.resources[i].update();
        state.resources[i].draw();
        if (state.resources[i] && collision(state.resources[i], state.mouse)) {
            state.numberOfResources += state.resources[i].amount;
            state.resources.splice(i, 1);
        }
    }
}

export function addResources() {
    setInterval(() => {
        if (state.score <= WINNING_SCORE) state.resources.push(new Resource());
    }, 2500);
}
