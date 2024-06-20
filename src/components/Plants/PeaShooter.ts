import Plant from "./Plant.js";
import { CELL_WIDTH } from "../../constants.js";
import Projectile from "../Projectiles/Projectile.ts";
import Game from "../../Game.ts";

export default class PeaShooter extends Plant {
  static cost: number = 25;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
  }

  attack() {
    if (this.game.frames % 100 === 0) {
      this.attackNow = true;
    }
    if (
      this.attacking &&
      this.attackNow &&
      this.frameX === 3 &&
      this.frameY === 1
    ) {
      this.attackNow = false;
      this.game.projectiles.push(
        new Projectile(
          this.game,
          this.x + CELL_WIDTH / 2,
          this.y + 19,
          this.bulletW,
          this.bulletH
        )
      );
    }
  }
}
