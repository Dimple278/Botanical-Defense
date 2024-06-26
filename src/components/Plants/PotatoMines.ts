import Plant from "./Plant.js";
import {
  CELL_WIDTH,
  CELL_HEIGHT,
  PotatoMineSprite,
} from "../../constants/constants.js";
import { isCollided } from "../../utilities/collision.ts";
import Game from "../../Game.ts";

/**
 * @class PotatoMines
 * @extends Plant
 * @classdesc Represents a PotatoMine plant in the game, with specific attack behaviors.
 */
export default class PotatoMines extends Plant {
  static cost: number = 100;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
  }

  initPlantAnimation() {
    // Animation support variables
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 10;
    this.endFrameY = 0;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 132;
    this.spriteH = 93;
    this.animationSpeed = 4;

    // Offset for drawing image
    this.offsetX = 0;
    this.offsetY = -75;
    this.offsetW = 100;
    this.offsetH = 0;
  }

  //load the sprite of plant
  loadSprite() {
    this.plantType = PotatoMineSprite;
  }

  attack() {
    let collided = false;

    // Checks if any zombies are collided with the mine
    this.game.zombies.every((zombie) => {
      if (isCollided(this, zombie) && zombie.x + zombie.w > this.x) {
        zombie.delete = true;
        collided = true;
        return false;
      }
      return true;
    });

    // If collided then all the zombies with one lane apart will also be killed
    if (collided) {
      this.frameX = 0;
      this.frameY = 1;
      this.startFrameX = 0;
      this.startFrameY = 1;
      this.endFrameX = 0;
      this.endFrameY = 1;
      this.offsetY = 20;
      setTimeout(() => {
        this.health = 0;
      }, 200);

      this.game.zombies.forEach((zombie) => {
        if (
          isCollided(
            {
              x: this.x,
              y: this.y - CELL_HEIGHT, // Above lane
              w: this.w + CELL_WIDTH, // Front lane
              h: this.h + CELL_HEIGHT * 2, // Below lane
            },
            zombie
          )
        ) {
          zombie.delete = true;
          this.game.score += 10;
        }
      });
    }
  }
}
