import { canvas, ctx, LawnCleanerImg } from "../constants.ts";
import { isCollided } from "../utilities/collision.ts";

import Game from "../Game.ts";

export default class LawnCleaner {
  game: Game;
  x: number;
  y: number;
  w: number;
  h: number;
  img: HTMLImageElement;
  cleaning: boolean;
  increment: number;
  delete: boolean;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = LawnCleanerImg;
    this.cleaning = false;
    this.increment = 0;
    this.delete = false;
  }

  update(): void {
    if (this.cleaning) {
      this.x += this.increment;
    }

    this.game.zombies.forEach((zombie) => {
      if (!this.cleaning && isCollided(this, zombie)) {
        this.cleaning = true;
        this.increment = 10;
      } else if (this.cleaning && isCollided(this, zombie)) {
        zombie.delete = true;
      }
    });
    0;
    if (this.x > canvas.width) {
      this.delete = true;
    }
    this.draw();
  }

  draw(): void {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
