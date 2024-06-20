import { BallonZombieSprite } from "../../constants";
import FootballZombie from "./FootballZombie";
import { Game } from "../../Game.ts";

export default class BallonZombie extends FootballZombie {
  drop: boolean;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.drop = true;
  }

  initZombieSpecs(): void {
    this.velocity = 1;
    this.increment = this.velocity;
    this.health = 200;
    this.delete = false;
    this.attacking = false;
    this.drop = true;
  }

  initZombieAnimation(): void {
    if (this.drop) {
      this.startFrameX = 0;
      this.startFrameY = 0;
      this.endFrameX = 1;
      this.endFrameY = 1;
    } else {
      this.startFrameX = 7;
      this.startFrameY = 8;
      this.endFrameX = 3;
      this.endFrameY = 12;
    }
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 207;
    this.spriteH = 197;
    this.animationSpeed = 4;

    this.offsetX = -90;
    this.offsetY = -90;
    this.offsetW = 90;
    this.offsetH = 90;
  }

  dieAnimation(): void {
    this.startFrameX = 1;
    this.startFrameY = 6;
    this.endFrameX = 6;
    this.endFrameY = 8;
    this.increment = 0;
  }
  attackAnimation(): void {
    if (this.drop) {
      this.startFrameX = 2;
      this.startFrameY = 1;
      this.endFrameX = 7;
      this.endFrameY = 3;
      if (this.frameY === this.endFrameY) {
        this.drop = false;
      }
    } else {
      this.startFrameX = 8;
      this.startFrameY = 3;
      this.endFrameX = 0;
      this.endFrameY = 6;
      this.checkFrames();
    }
  }

  loadSprite(): void {
    this.zombieType = BallonZombieSprite;
  }
}
