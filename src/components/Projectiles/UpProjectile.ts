import { CELL_HEIGHT } from "../../constants/constants.js";
import Projectile from "./Projectile.js";
import Game from "../../Game.js";

/**
 * Represents a projectile that moves upward until reaching a specified top position.
 */
export default class UpProjectile extends Projectile {
  private topPos: number;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.topPos = y - CELL_HEIGHT;
  }

  update() {
    this.x += this.speed;
    if (this.y > this.topPos) {
      this.y -= this.speed;
    }
    this.draw();
    this.checkCollision();
  }
}
