import { mouseStatus } from "../constants/constants";
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
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "rgba(0, 0, 0, 0.0)";
    ctx.fillStyle = "#0008";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    if (mouseStatus.x && mouseStatus.y && isCollided(this, mouseStatus)) {
      const radius = 55; // Radius of the circle
      const centerX = this.x + this.w / 2;
      const centerY = this.y + this.h / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
