import Plant from "./Plant.js";
import { CELL_WIDTH, chomp, ChomperSprite } from "../../constants/constants.js";
import Game from "../../Game.ts";

/**
 * @class Chomper
 * @extends Plant
 * @classdesc Represents a Chomper plant in the game, with specific animation and attack behaviors.
 */
export default class Chomper extends Plant {
  static cost = 175;
  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
  }

  initPlantAnimation() {
    // Animation support variables
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 2;
    this.endFrameY = 2;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 130;
    this.spriteH = 114;
    this.animationSpeed = 5;

    // Offset for drawing image
    this.offsetX = 0;
    this.offsetY = 30;
    this.offsetW = 50;
    this.offsetH = 50;
  }

  loadSprite() {
    this.plantType = ChomperSprite;
  }

  updateAnimation() {
    if (this.attackNow) {
      // If attacking show attack animation
      this.startFrameX = 3;
      this.startFrameY = 2;
      this.endFrameX = 5;
      this.endFrameY = 4;

      // Stop the attacking mode after the animation is finished
      this.attackNow = false;
    } else if (this.cooldown) {
      // If in cooldown shows the chewing animation
      this.startFrameX = 6;
      this.startFrameY = 4;
      this.endFrameX = 10;
      this.endFrameY = 5;
    } else if (!this.attackNow && !this.cooldown) {
      // Shows idle animation if neither are true
      this.startFrameX = 0;
      this.startFrameY = 0;
      this.endFrameX = 2;
      this.endFrameY = 2;
    }
  }

  attack() {
    if (this.attacking && !this.cooldown) {
      this.game.zombies.every((zombie) => {
        if (
          zombie.y === this.y &&
          zombie.x - (this.x + this.w) <= CELL_WIDTH - 50 &&
          zombie.x - (this.x + this.w) >= -CELL_WIDTH
        ) {
          // Set the attacking mode true
          this.attackNow = true;
          this.cooldown = true;

          // Set the frame on attacking animation frame
          this.frameX = 9;
          this.frameY = 3;

          // Eat the zombie
          this.game.volume && chomp.play();
          zombie.delete = true;
          this.game.score += 10;

          // Give a cooldown of 10 sec before it can eat again and
          // reset the animation frame
          setTimeout(() => {
            this.cooldown = false;
            this.frameX = 0;
            this.frameY = 0;
          }, 10000);

          // stop the loop
          return false;
        }

        // continue the loop
        return true;
      });
    }
  }
}
