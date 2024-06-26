import {
  CELL_WIDTH,
  ctx,
  normalBullet,
  canvas,
  peaHit,
} from "../../constants/constants.js";
import { isCollided } from "../../utilities/collision.ts";
import Game from "../../Game.ts";

export default class Projectile {
  game: Game;
  x: number;
  y: number;
  w: number;
  h: number;
  damage: number = 10;
  speed: number = 3;
  delete: boolean = false;
  bullet: HTMLImageElement = normalBullet;

  /**
   * Represents a projectile fired by a plant in the game.
   */
  constructor(game: Game, x: number, y: number, w: number, h: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    ctx.drawImage(this.bullet, this.x, this.y, this.w, this.h);
  }

  checkCollision() {
    this.game.zombies.every((zombie) => {
      if (isCollided(this, zombie)) {
        this.game.volume && peaHit.play();
        zombie.health -= this.damage;
        zombie.hit = true;
        this.delete = true;
        return false; // Stop iteration as collision occurred
      }
      return true; // Continue iteration
    });

    if (this.x > canvas.width - CELL_WIDTH) {
      this.delete = true;
    }
  }

  update() {
    this.x += this.speed;
    this.draw();
    this.checkCollision();
  }
}
