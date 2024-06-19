// Importing necessary modules and constants
import Sun from "./Sun.js";
import Projectile, {
    BottomProjectile,
    ParabolicProjectile,
    TopProjectile,
} from "./Projectile.js";
import {
    CELL_PAD,
    CELL_WIDTH,
    CELL_HEIGHT,
    ctx,
    GRID_ROW_START_POS,
} from "../constants.ts";
import { isCollided } from "../utilities/collision.ts";

// Interfaces
interface IPlant {
    game: any;
    x: number;
    y: number;
    w: number;
    h: number;
    attackNow: boolean;
    health: number;
    bulletW: number;
    bulletH: number;
    attacking: boolean;
    cooldown: number;
    frameX: number;
    frameY: number;
    spriteW: number;
    spriteH: number;
    animationSpeed: number;
    offsetX: number;
    offsety: number;
    offsetW: number;
    offsetH: number;
    plantType: HTMLImageElement;
    startFrameX: number;
    startFrameY: number;
    endFrameX: number;
    endFrameY: number;
    minFrame: number;
    maxFrame: number;
    initPlantSpec(): void;
    initPlantAnimation(): void;
    loadSprite(): void;
    draw(): void;
    handleCollision(): void;
    loopAnimation(): void;
    attack(): void;
    updateAnimation(): void;
    update(): void;
}

// Plant class
export default class Plant implements IPlant {
    game: any;
    x: number;
    y: number;
    w: number;
    h: number;
    attackNow: boolean = false;
    health!: number;
    bulletW!: number;
    bulletH!: number;
    attacking: boolean = false;
    cooldown: number = 0;
    frameX!: number;
    frameY!: number;
    spriteW!: number;
    spriteH!: number;
    animationSpeed!: number;
    offsetX!: number;
    offsety!: number;
    offsetW!: number;
    offsetH!: number;
    plantType!: HTMLImageElement;
    startFrameX!: number;
    startFrameY!: number;
    endFrameX!: number;
    endFrameY!: number;
    minFrame!: number;
    maxFrame!: number;

    constructor(game: any, x: number, y: number, w: number, h: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w - CELL_PAD * 2;
        this.h = h - CELL_PAD * 2;

        this.initPlantSpec();
        this.initPlantAnimation();
        this.loadSprite();
    }

    initPlantSpec() {
        this.health = 100;
        this.bulletW = 60;
        this.bulletH = 40;
    }

    initPlantAnimation() {
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 2;
        this.endFrameY = 2;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 71;
        this.spriteH = 71;
        this.animationSpeed = 3;

        this.offsetX = -15;
        this.offsety = -15;
        this.offsetW = -15;
        this.offsetH = -15;
    }

    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/PeashooterSprite_71x71.png";
    }

    draw() {
        if (this.x === undefined) {
            console.log("undefined detected");
        }
        ctx.drawImage(
            this.plantType,
            this.frameX * this.spriteW,
            this.frameY * this.spriteH,
            this.spriteW,
            this.spriteH,
            this.x - this.offsetX,
            this.y - this.offsety,
            this.w + this.offsetW,
            this.h + this.offsetH
        );
    }

    handleCollision() {
        this.game.zombies.forEach((zombie: any) => {
            if (isCollided(this, zombie)) {
                this.health -= 0.2;
                zombie.increment = 0;
                zombie.attacking = true;
            }
        });
    }

    loopAnimation() {
        if (this.game.frames % this.animationSpeed === 0) {
            if (this.frameY < this.endFrameY) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX =
                        this.frameY === this.startFrameY
                            ? this.startFrameX
                            : this.minFrame;
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

    attack() {}

    updateAnimation() {}

    update() {
        if (this.game.zombiesPositions.indexOf(this.y) !== -1) {
            this.attacking = true;
        } else {
            this.attacking = false;
        }

        this.attack();
        this.handleCollision();
        this.loopAnimation();
        this.updateAnimation();

        if (this.health <= 0) {
            this.game.zombies.forEach((zombie: any) => {
                if (isCollided(this, zombie)) {
                    zombie.increment = zombie.velocity;
                    zombie.attacking = false;
                    zombie.initZombieAnimation();
                }
            });
        }
        this.draw();
    }
}

// Sunflower class
export class Sunflower extends Plant {
    frame: number; // Adding the frame property

    constructor(game: any, x: number, y: number, w: number, h: number) {
        super(game, x, y, w, h);
        this.frame = 1; // Initialize the frame property
    }

    initPlantAnimation() {
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

        this.offsetX = -15;
        this.offsety = -15;
        this.offsetW = -15;
        this.offsetH = -15;
    }

    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/SunFlowerSprite_73x74.png";
    }

    spwanSun() {
        setInterval(() => {});
        if (this.frame % 2000 === 0) {
            this.game.suns.push(
                new Sun(
                    this.game,
                    this.x,
                    this.y + CELL_HEIGHT - 50,
                    this.y - 40
                )
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

// PeaShooter class
export class PeaShooter extends Plant {
    attack() {
        if (this.game.frames % 100 === 0) {
            this.attackNow = true;
        }
        if (
            this.attacking &&
            this.attackNow &&
            this.frameX === 3 &&
            this.frameY === 1
        ) {
            this.attackNow = false;
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2,
                    this.y + 19,
                    this.bulletW,
                    this.bulletH
                )
            );
        }
    }
}

// Repeater class
export class Repeater extends Plant {
    initPlantAnimation() {
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.endFrameX = 2;
        this.endFrameY = 2;
        this.minFrame = 0;
        this.maxFrame = 10;
        this.frameX = this.startFrameX;
        this.frameY = this.startFrameY;
        this.spriteW = 71;
        this.spriteH = 71;
        this.animationSpeed = 3;

        this.offsetX = -15;
        this.offsety = -15;
        this.offsetW = -15;
        this.offsetH = -15;
    }

    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/RepeaterSprite_71x71.png";
    }

    attack() {
        if (this.game.frames % 50 === 0) {
            this.attackNow = true;
        }
        if (
            this.attacking &&
            this.attackNow &&
            this.frameX === 3 &&
            this.frameY === 1
        ) {
            this.attackNow = false;
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2 + 10,
                    this.y + 24,
                    this.bulletW,
                    this.bulletH
                )
            );
        }
    }
}

// SnowPea class
export class SnowPea extends Plant {
    attack() {
        if (this.game.frames % 100 === 0) {
            this.attackNow = true;
        }
        if (
            this.attacking &&
            this.attackNow &&
            this.frameX === 3 &&
            this.frameY === 1
        ) {
            this.attackNow = false;
            this.game.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + CELL_WIDTH / 2,
                    this.y + 19,
                    this.bulletW,
                    this.bulletH,
                    // true    // Correct number of arguments for Projectile
                )
            );
        }
    }

    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/SnowPeaSprite_71x71.png";
    }
}

// ThreePeater class
export class ThreePeashooter extends Plant {
    attack() {
        if (this.attacking) {
            this.cooldown++;
            if (this.cooldown % 100 === 0) {
                this.game.projectiles.push(
                    new ParabolicProjectile(
                        this.game,
                        this.x + CELL_WIDTH / 2,
                        this.y + CELL_HEIGHT / 2 - 15,
                        this.bulletW,
                        this.bulletH
                    )
                );

                if (this.y + 1 !== GRID_ROW_START_POS) {
                    this.game.projectiles.push(
                        new TopProjectile(
                            this.game,
                            this.x + CELL_WIDTH / 2,
                            this.y + CELL_HEIGHT / 2 - 15,
                            this.bulletW,
                            this.bulletH
                        )
                    );
                }
                if (this.y - 1 !== GRID_ROW_START_POS) {
                    this.game.projectiles.push(
                        new BottomProjectile(
                            this.game,
                            this.x + CELL_WIDTH / 2,
                            this.y + CELL_HEIGHT / 2 - 15,
                            this.bulletW,
                            this.bulletH
                        )
                    );
                }
            }
        } else {
            this.cooldown = 0;
        }
    }

    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/ThreePeaterSprite_71x71.png";
    }
}

// Wallnut class
export class Wallnut extends Plant {
    loadSprite() {
        this.plantType = new Image();
        this.plantType.src = "../../assets/images/WallnutSprite_73x74.png";
    }
}
