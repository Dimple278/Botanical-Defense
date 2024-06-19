import { FootballZombieSprite } from "../../constants";
import Zombie from "./Zombie";
import { Game } from "../../Game.ts";

export default class FootballZombie extends Zombie {
  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.initZombieSpecs();
    this.initZombieAnimation();
    this.loadSprite();
  }

  initZombieSpecs(): void {
    this.velocity = 2;
    this.increment = this.velocity;
    this.health = 150;
    this.delete = false;
    this.attacking = false;
  }

  loadSprite(): void {
    this.zombieType = FootballZombieSprite;
  }

  initZombieAnimation(): void {
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 7;
    this.endFrameY = 2;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 300;
    this.spriteH = 300;
    this.animationSpeed = 2;
    this.offsetX = -70;
    this.offsetY = -70;
    this.offsetW = 70;
    this.offsetH = 70;
  }

  attackAnimation(): void {
    this.startFrameX = 8;
    this.startFrameY = 2;
    this.endFrameX = 10;
    this.endFrameY = 5;
  }

  dieAnimation(): void {
    this.startFrameX = 3;
    this.startFrameY = 9;
    this.endFrameX = 9;
    this.endFrameY = 10;
    this.increment = 0;
  }
}
