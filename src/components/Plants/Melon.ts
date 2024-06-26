import Plant from "./Plant";
import ParabolicProjectile from "../Projectiles/ParabolicProjectile";
import { MelonpultSprite } from "../../constants/constants";
import Game from "../../Game";

export default class MelonPult extends Plant {
  static cost: number = 150;
  cooldownCounter: number = 0;

  constructor(game: Game, x: number, y: number, w: number, h: number) {
    super(game, x, y, w, h);
    this.initPlantAnimation();
  }

  // Initializes all the variables required for animation
  initPlantAnimation(): void {
    // Animation support variables
    this.startFrameX = 0;
    this.startFrameY = 0;
    this.endFrameX = 0;
    this.endFrameY = 0;
    this.minFrame = 0;
    this.maxFrame = 10;
    this.frameX = this.startFrameX;
    this.frameY = this.startFrameY;
    this.spriteW = 459;
    this.spriteH = 345;
    this.animationSpeed = 3;

    // Offset for drawing image
    this.offsetX = 20;
    this.offsetY = -15;
    this.offsetW = 25;
    this.offsetH = -15;
  }

  // Loads the sprite of the plant
  loadSprite(): void {
    this.plantType = MelonpultSprite;
  }

  // Attacks by launching a parabolic projectile
  attack(): void {
    if (this.attacking) {
      this.cooldownCounter++;
      if (this.cooldownCounter % 100 === 0) {
        this.game.projectiles.push(
          new ParabolicProjectile(this.game, this.x, this.y, 62, 55)
        );
      }
    } else {
      this.cooldownCounter = 0;
    }
  }
}
