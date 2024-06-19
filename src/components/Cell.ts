import { mouseStatus, ctx } from "../constants";
import { isCollided } from "../utilities/collision";

export default class Cell {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(ctx:CanvasRenderingContext2D) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        if (mouseStatus.x && mouseStatus.y && isCollided(this, mouseStatus)) {
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}
