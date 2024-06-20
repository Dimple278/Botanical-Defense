import {
  CELL_WIDTH,
  peaHit,
  canvas,
  CELL_HEIGHT,
  melonBullet,
} from "../../constants";
import { isCollided } from "../../utilities/collision";
import Projectile from "./Projectile";
import Zombie from "../Zombies/Zombie";
import Game from "../../Game";

export default class ParabolicProjectile extends Projectile {
  // Properties declaration with initial types
  temp: number;
  initialFrame: number;
  theta: number;
  futureTime: number;
  target: Zombie | undefined;
  futureZombiePos: number;
  targetDist: number;
  speed: number;
  d_theta: number;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);

    this.temp = y;
    this.initialFrame = this.game.frames;

    this.theta = 0;
    this.futureTime = 90;

    this.target = undefined;
    this.futureZombiePos = 0;
    this.targetDist = 0;
    this.speed = 0;
    this.d_theta = 0;

    this.getTarget();

    // Calculate speed and angle based on target's position and movement
    if (this.target) {
      if (this.target.attacking !== true) {
        // Predict future position if zombie is not attacking
        this.futureZombiePos =
          this.target.x - this.target.velocity * this.futureTime;
        this.targetDist = this.futureZombiePos - this.x;
        this.speed = this.targetDist / this.futureTime;
        this.d_theta = 180 / this.futureTime;
      } else {
        // Use fixed speed and angle if zombie is attacking
        this.targetDist = this.target.x - this.x;
        this.speed = this.targetDist / 20;
        this.d_theta = 180 / 20;
      }
    }

    // Mark projectile for deletion if no valid target or target is too close
    if (!this.target || this.targetDist <= 0) {
      this.delete = true;
    }
  }

  // Load bullet sprite for drawing
  loadBullet(): void {
    this.bullet = melonBullet;
  }

  // Find the target zombie based on projectile's initial y position
  getTarget(): void {
    this.game.zombies.every((zombie: Zombie) => {
      if (this.y >= zombie.y && this.y <= zombie.y + (CELL_HEIGHT - 100)) {
        this.target = zombie; // Set target zombie
        return false; // Stop iteration
      }
      return true; // Continue iteration
    });
  }

  // Check collision with zombies and handle damage
  checkCollision(): void {
    this.game.zombies.every((zombie: Zombie) => {
      if (this.temp === zombie.y && isCollided(this, zombie)) {
        // If projectile collides with a zombie
        this.game.volume && peaHit.play();
        zombie.health -= this.damage;
        zombie.hit = true;
        this.delete = true;
        return false;
      }
      return true;
    });

    // Mark projectile for deletion if it goes beyond canvas width
    if (this.x > canvas.width - CELL_WIDTH) {
      this.delete = true;
    }
  }

  // Update projectile position and check for collision
  update(): void {
    this.theta += this.d_theta;
    this.x += this.speed;
    this.y =
      this.temp -
      Math.sin((this.theta * Math.PI) / 180) * this.targetDist * 0.2;

    if (this.theta > 180) {
      this.delete = true; // Mark projectile for deletion if angle exceeds 180 degrees
    } else {
      this.checkCollision();
    }
    this.draw();
  }

  // Draw the projectile on the canvas
  draw(): void {
    super.draw();
  }
}
