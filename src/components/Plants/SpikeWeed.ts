import Plant from "./Plant";
import { isCollided } from "../../utilities/collision";
import { SpikeweedSprite } from "../../constants/constants";
import Game from "../../Game";

/**
 * Represents a Spikeweed plant that damages zombies upon collision.
 * @extends Plant
 */
export default class Spikeweed extends Plant {
  static cost: number = 50;
  hit: boolean = false;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.initPlantAnimation();
  }

  initPlantAnimation(): void {
    // Animation support variables
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 9;
    this.endFrameY = 1;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 100;
    this.spriteH = 41;
    this.animationSpeed = 5;

    // Offset for drawing image
    this.offsetX = 0;
    this.offsetY = -75;
    this.offsetW = 20;
    this.offsetH = -50;
  }

  loadSprite(): void {
    this.plantType = SpikeweedSprite;
  }

  handleCollision(): void {
    this.game.zombies.forEach((zombie) => {
      if (isCollided(this, zombie)) {
        zombie.health -= 0.12;
        if (!this.hit) {
          zombie.hit = true;
          this.hit = true;

          setTimeout(() => {
            this.hit = false;
          }, 500);
        }
      }
    });
  }
}
