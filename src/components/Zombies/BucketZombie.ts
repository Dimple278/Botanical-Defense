import { BucketHeadZombieSprite } from "../../constants";
import Zombie from "./Zombie";
import { Game } from "../../Game.ts";

export default class BucketZombie extends Zombie {
  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
  }

  initZombieSpecs(): void {
    this.velocity = 0.5;
    this.increment = this.velocity;
    this.health = 120;
    this.delete = false;
    this.attacking = false;
  }

  loadSprite(): void {
    this.zombieType = BucketHeadZombieSprite;
  }
}
