import { CELL_WIDTH, CELL_HEIGHT, ctx,canvas } from "../constants.ts";
import { isCollided } from "../utilities/collision.ts";


export default class Projectile {
    game: any;
    x: number;
    y: number;
    w: number;
    h: number;
    damage: number;
    speed: number;
    delete: boolean;
    bullet!: HTMLImageElement; // Non-null assertion

    constructor(game: any, x: number, y: number, w: number, h: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.damage = 10;
        this.speed = 3;
        this.delete = false;

        // Initialize bullet property
        this.bullet = new Image();
        this.bullet.src = "../../assets/images/Plants/PB00.gif";
    }

    draw() {
        ctx.drawImage(this.bullet, this.x, this.y, this.w, this.h);
    }

    checkCollision() {
        this.game.zombies.every((zombie: any) => {
            if (isCollided(this, zombie)) {
                zombie.health -= this.damage;
                zombie.hit = true;
                this.delete = true;
                return false;
            }
            return true;
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

export class TopProjectile extends Projectile {
    constructor(game: any, x: number, y: number, w: number, h: number) {
        super(game, x, y, w, h);
    }

    update() {
        this.x += this.speed;
        this.y -= this.speed; // Example modification, adjust as needed
        this.draw();
        this.checkCollision();
    }
}

export class BottomProjectile extends Projectile {
    constructor(game: any, x: number, y: number, w: number, h: number) {
        super(game, x, y, w, h);
    }

    update() {
        this.x += this.speed;
        this.y += this.speed; // Example modification, adjust as needed
        this.draw();
        this.checkCollision();
    }
}

export class ParabolicProjectile extends Projectile {
    target: any;
    temp: number;
    initialFrame: number;
    theta: number;
    futureTime: number;
    futureZombiePos: number = 0; // Initialize with default value
    targetDist: number = 0; // Initialize with default value
    d_theta: number = 0; // Initialize with default value

    constructor(game: any, x: number, y: number, w: number, h: number) {
        super(game, x, y, w, h);

        this.temp = y;
        this.initialFrame = this.game.frames;
        this.theta = 0;
        this.futureTime = 90;

        this.getTarget();

        if (this.target) {
            if (!this.target.attacking) {
                this.futureZombiePos =
                    this.target.x - this.target.velocity * this.futureTime;
                this.targetDist = this.futureZombiePos - this.x;
                this.speed = this.targetDist / this.futureTime;
                this.d_theta = 180 / this.futureTime;
            } else {
                this.targetDist = this.target.x - this.x;
                this.speed = this.targetDist / 20;
                this.d_theta = 180 / 20;
            }
        }

        if (!this.target || this.targetDist <= 0) {
            this.delete = true;
        }
    }

    loadBullet() {
        this.bullet = new Image();
        this.bullet.src = "../../assets/images/Melonpult_melon.webp";
    }

    getTarget() {
        this.game.zombies.every((zombie: any) => {
            if (this.y >= zombie.y && this.y <= zombie.y + (CELL_HEIGHT - 100)) {
                this.target = zombie;
                return false;
            }
            return true;
        });
    }

    checkCollision() {
        this.game.zombies.every((zombie: any) => {
            if (this.temp === zombie.y && isCollided(this, zombie)) {
                zombie.health -= this.damage;
                zombie.hit = true;
                this.delete = true;
                return false;
            }
            return true;
        });

        if (this.x > canvas.width - CELL_WIDTH) {
            this.delete = true;
        }
    }

    update() {
        this.theta += this.d_theta;
        this.x += this.speed;
        this.y = this.temp - Math.sin((this.theta * Math.PI) / 180) * this.targetDist * 0.2;

        if (this.theta > 180) {
            this.delete = true;
        } else {
            this.checkCollision();
        }
        this.draw();
    }

    draw() {
        super.draw();
    }
}
