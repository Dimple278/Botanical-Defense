import { ctx } from "./constants";

export class FloatingMsg {
  value: string;
  x: number;
  y: number;
  size: number;
  color: string;
  lifeSpan: number;
  opacity: number;

  constructor(
    value: string,
    x: number,
    y: number,
    size: number,
    color: string
  ) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.lifeSpan = 0;
    this.opacity = 1;
  }

  update() {
    this.y -= 0.3;
    this.lifeSpan += 1;
    if (this.opacity > 0.01) this.opacity -= 0.01;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px Creepster`;
    ctx.fillText(this.value, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}
