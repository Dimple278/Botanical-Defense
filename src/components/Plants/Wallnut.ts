import Plant from "./Plant";
import { WallnutSprite } from "../../constants";
import Game from "../../Game";

export default class WallNut extends Plant {
  static cost: number = 75;
  health: number = 500;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.initPlantAnimation();
  }

  // Initializes all the variables required for animation
  initPlantAnimation(): void {
    // Animation support variables
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 5;
    this.endFrameY = 1;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 65;
    this.spriteH = 73;
    this.animationSpeed = 4;

    // Offset for drawing image
    this.offsetX = 0;
    this.offsetY = 0; // Corrected from offsety to offsetY
    this.offsetW = 0;
    this.offsetH = 0;
  }

  // Loads the sprite of the zombie
  loadSprite(): void {
    this.plantType = WallnutSprite;
  }

  // Updates the animation based on health
  updateAnimation(): void {
    if (this.health < 300) {
      this.startFrameX = 1;
      this.startFrameY = 3;
      this.endFrameX = 6;
      this.endFrameY = 4;
    } else if (this.health < 100) {
      this.startFrameX = 6;
      this.startFrameY = 1;
      this.endFrameX = 0;
      this.endFrameY = 3;
    }
  }
}
