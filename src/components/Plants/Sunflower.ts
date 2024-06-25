import Plant from "./Plant.js";
import Sun from "../Sun.js";
import { CELL_HEIGHT, SunflowerSprite } from "../../constants/constants.js";
import Game from "../../Game.ts";

/**
 * Represents a Sunflower plant that generates sun resources over time.
 * @extends Plant
 */
export default class Sunflower extends Plant {
  static cost: number = 50;
  frame: number;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.frame = 1;
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
    this.spriteW = 73;
    this.spriteH = 74;
    this.animationSpeed = 3;

    // Offset for drawing image
    this.offsetX = -15;
    this.offsetY = -15;
    this.offsetW = -15;
    this.offsetH = -15;
  }

  // Loads the sprite of the sunflower
  loadSprite() {
    this.plantType = SunflowerSprite;
  }

  spwanSun() {
    if (this.frame % 700 === 0) {
      this.game.suns.push(
        new Sun(this.game, this.x, this.y + CELL_HEIGHT - 50, this.y - 40)
      );
    }
  }

  update() {
    super.update();
    this.spwanSun();
    this.draw();
    this.frame += 1;
  }
}
