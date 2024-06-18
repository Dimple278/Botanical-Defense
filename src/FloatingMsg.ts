import { CTX, state } from "./state";
import { IFloatingMsg } from "./types";

export class FloatingMsg implements IFloatingMsg {
    value: string;
    x: number;
    y: number;
    size: number;
    color: string;
    lifeSpan: number;
    opacity: number;

    constructor(value: string, x: number, y: number, size: number, color: string) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }

    update() {
        this.y -= 0.3;
        this.lifeSpan += 1;
        if (this.opacity > 0.01) this.opacity -= 0.01;
    }

    // handleFloatingMessage(message){

    // }
    draw() {
        CTX.globalAlpha = this.opacity;
        CTX.fillStyle = this.color;
        CTX.font = `${this.size}px Orbitron`;
        CTX.fillText(this.value, this.x, this.y);
        CTX.globalAlpha = 1;
    }
}

export function handleFloatingMessages() {
    for (let i = 0; i < state.floatingMsg.length; i++) {
        state.floatingMsg[i].update();
        state.floatingMsg[i].draw();
        if (state.floatingMsg[i].lifeSpan >= 50) {
            state.floatingMsg.splice(i, 1);
            i--;
        }
    }
    
}
