import { ConeHeadZombieSprite } from "../../constants/constants.ts";
import Zombie from "./Zombie";
import { Game } from "../../Game.ts";

export default class ConeHeadZombie extends Zombie {
  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
  }

  initZombieSpecs(): void {
    this.velocity = 0.6;
    this.increment = this.velocity;
    this.health = 150;
    this.delete = false;
    this.attacking = false;
  }

  loadSprite(): void {
    this.zombieType = ConeHeadZombieSprite;
  }
}
