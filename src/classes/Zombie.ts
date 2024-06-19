import {
  CELL_PAD,
  ctx,
  FootballZombieSprite,
  // zombieFall,
} from "../constants.ts";

interface Game {
  zombiesPositions: number[];
  score: number;
  frames: number;
  volume: boolean;
}

export default class Zombie {
  game: Game;
  x: number;
  y: number;
  w: number;
  h: number;
  die: boolean;
  hit: boolean;
  velocity!: number;
  increment!: number;
  health!: number;
  delete!: boolean;
  attacking!: boolean;
  startFrameX!: number;
  startFrameY!: number;
  endFrameX!: number;
  endFrameY!: number;
  minFrame!: number;
  maxFrame!: number;
  frameX!: number;
  private frameY!: number;
  private spriteW!: number;
  private spriteH!: number;
  private animationSpeed!: number;
  private offsetX!: number;
  private offsetY!: number;
  private offsetW!: number;
  private offsetH!: number;
  private zombieType!: HTMLImageElement;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = w - CELL_PAD * 2;
    this.h = h - CELL_PAD * 2;
    this.die = false;
    this.hit = false;

    this.initZombieSpecs();
    this.initZombieAnimation();
    this.loadSprite();
  }

  private initZombieSpecs(): void {
    this.velocity = 2;
    this.increment = this.velocity;
    this.health = 150;
    this.delete = false;
    this.attacking = false;
  }

  private initZombieAnimation(): void {
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

  private loadSprite(): void {
    this.zombieType = FootballZombieSprite;
  }

  public draw(): void {
    console.log("drawing");
    if (this.hit) {
      ctx.globalAlpha = 0.6;
    }
    ctx.drawImage(
      this.zombieType,
      this.frameX * this.spriteW,
      this.frameY * this.spriteH,
      this.spriteW,
      this.spriteH,
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.w + this.offsetW,
      this.h + this.offsetH
    );
    if (this.hit) {
      ctx.globalAlpha = 1;
      setTimeout(() => {
        this.hit = false;
      }, 100);
    }
  }

  public attackAnimation(): void {
    this.startFrameX = 8;
    this.startFrameY = 2;
    this.endFrameX = 10;
    this.endFrameY = 5;
  }

  public removeZombies(): void {
    if (this.frameX === this.endFrameX && this.frameY === this.endFrameY) {
      let attackRowIdx = this.game.zombiesPositions.indexOf(this.y);
      this.game.zombiesPositions.splice(attackRowIdx, 1);
      this.delete = true;
      this.game.score += 10;
    }
  }

  public checkFrames(): void {
    if (this.frameY < this.startFrameY || this.frameY > this.endFrameY) {
      this.frameX = this.startFrameX;
      this.frameY = this.startFrameY;
    } else if (
      this.frameY === this.startFrameY &&
      this.frameX < this.startFrameX
    ) {
      this.frameX = this.startFrameX;
    }
  }

  public dieAnimation(): void {
    this.startFrameX = 3;
    this.startFrameY = 9;
    this.endFrameX = 9;
    this.endFrameY = 10;
    this.increment = 0;
  }

  public loopAnimation(): void {
    if (this.game.frames % this.animationSpeed === 0) {
      if (this.frameY < this.endFrameY) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX =
            this.frameY === this.startFrameY ? this.startFrameX : this.minFrame;
          this.frameY++;
        }
      } else if (this.frameY === this.endFrameY) {
        if (this.frameX < this.endFrameX) {
          this.frameX++;
        } else {
          this.frameX = this.startFrameX;
          this.frameY = this.startFrameY;
        }
      }
    }
  }

  public update(): void {
    this.x -= this.increment;
    if (this.attacking) {
      this.attackAnimation();
    }
    if (this.die) {
      // this.game.volume && zombieFall.play();
      this.dieAnimation();
      this.checkFrames();
      this.removeZombies();
    }
    this.loopAnimation();
    this.draw();
  }
}
