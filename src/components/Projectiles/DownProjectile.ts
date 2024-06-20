import { CELL_HEIGHT } from "../../constants.js";
import Projectile from "./Projectile.js";
// import Game from "../../Game.js";

interface Game {
  zombies: any[];
}

export default class BottomProjectile extends Projectile {
  private bottomPos: number;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.bottomPos = y + CELL_HEIGHT;
  }

  update() {
    this.x += this.speed;
    if (this.y < this.bottomPos) {
      this.y += this.speed;
    }
    this.draw();
    this.checkCollision();
  }
}
