import {
  CELL_PAD,
  ctx,
  NormalZombieSprite,
  // zombieFall,
} from "../../constants.ts";

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
  spriteW!: number;
  frameY!: number;
  spriteH!: number;
  animationSpeed!: number;
  offsetX!: number;
  offsetY!: number;
  offsetW!: number;
  offsetH!: number;
  zombieType!: HTMLImageElement;

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

  initZombieSpecs(): void {
    // Movement variables
    this.velocity = 0.3;
    this.increment = this.velocity;

    // Life
    this.health = 100;

    // Zombie status
    this.delete = false;
    this.attacking = false;
  }

  initZombieAnimation(): void {
    // Animation support variables
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 2;
    this.endFrameY = 4;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 166;
    this.spriteH = 144;
    this.animationSpeed = 4;

    // Offset for drawing image
    this.offsetX = -70;
    this.offsetY = -70;
    this.offsetW = 70;
    this.offsetH = 70;
  }

  loadSprite(): void {
    this.zombieType = NormalZombieSprite;
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
    this.startFrameX = 3;
    this.startFrameY = 4;
    this.endFrameX = 9;
    this.endFrameY = 7;
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
    this.startFrameX = 10;
    this.startFrameY = 7;
    this.endFrameX = 4;
    this.endFrameY = 11;
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
