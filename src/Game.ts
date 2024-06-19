import {
  canvas,
  ctx,
  CELL_WIDTH,
  CELL_HEIGHT,
  mouseStatus,
  bg,
  GRID_COL_START_POS,
  GRID_ROW_START_POS,
  gameState,
  CELL_PAD,
  PeaShooterCard,
  ThreePeaShooterCard,
  RepeaterCard,
  ChomperCard,
  WallNutCard,
  PotatoMinesCard,
  resourcescard,
  MelonPultCard,
  SpikeweedCard,
  SunflowerCard,
  LAWN_CLEANER_WIDTH,
} from "./constants";
import { isCollided } from "./utilities/collision";
import { initializeGrid } from "./utilities/gridUtils";
import Plant, {
  PeaShooter,
  Repeater,
  Sunflower,
  ThreePeashooter,
  Wallnut,
} from "./components/Plant";
import Cell from "./components/Cell";
import Sun from "./components/Sun";
import LawnCleaner from "./components/LawnCleaner";
import Zombie from "./components/Zombies/Zombie";
import FootballZombie from "./components/Zombies/FootballZombie";
import ConeHeadZombie from "./components/Zombies/ConeHeadZombie";
import Projectile from "./components/Projectile";
import BucketHeadZombie from "./components/Zombies/BucketZombie";
import BallonZombie from "./components/Zombies/BalloonZombie";

export class Game {
  canvasPosition: DOMRect;
  grids: Cell[];
  zombies: Zombie[];
  suns: Sun[];
  projectiles: Projectile[];
  plants: Plant[];
  lawnCleaners: LawnCleaner[];
  sunCounts: number;
  zombiesSpawnRate: number;
  zombiesPositions: number[];
  selectedPlant: number;
  frames: number;
  zombiesTypes: (typeof Zombie)[];
  score: number;
  volume: boolean;

  constructor() {
    this.canvasPosition = canvas.getBoundingClientRect();

    this.grids = [];
    this.zombies = [];
    this.suns = [];
    this.projectiles = [];
    this.plants = [];
    this.lawnCleaners = [];

    this.sunCounts = 200;
    this.zombiesSpawnRate = 200;
    this.zombiesPositions = [];
    this.selectedPlant = 0;
    this.frames = 0;
    this.score = 0;
    this.volume = true;

    this.zombiesTypes = [
      Zombie,
      FootballZombie,
      ConeHeadZombie,
      BucketHeadZombie,
      BallonZombie,
    ];

    for (
      let row = GRID_ROW_START_POS;
      row < canvas.height - CELL_HEIGHT;
      row += CELL_HEIGHT
    ) {
      this.lawnCleaners.push(
        new LawnCleaner(
          this,
          350,
          row + 30,
          LAWN_CLEANER_WIDTH,
          LAWN_CLEANER_WIDTH
        )
      );
    }
  }

  addListeners() {
    window.addEventListener("resize", () => {
      this.canvasPosition = canvas.getBoundingClientRect();
    });

    canvas.addEventListener("mousemove", (e) => {
      mouseStatus.x = e.x - this.canvasPosition.left;
      mouseStatus.y = e.y - this.canvasPosition.top;
    });

    canvas.addEventListener("mouseleave", () => {
      mouseStatus.x = 0;
      mouseStatus.y = 0;
    });

    canvas.addEventListener("mousedown", () => {
      mouseStatus.clicked = true;
    });

    canvas.addEventListener("mouseup", () => {
      mouseStatus.clicked = false;
    });
  }

  drawGrid() {
    this.grids.forEach((gridCell) => {
      gridCell.draw(ctx);
    });
  }

  manageAllZombies() {
    this.zombies.forEach((zombie) => {
      zombie.update();
      if (zombie.x < GRID_COL_START_POS - LAWN_CLEANER_WIDTH) {
        gameState.current = gameState.gameOver;
      }
      if (zombie.health <= 0) {
        zombie.die = true;
        zombie.attacking = false;
      }
    });
    let selectedRow =
      Math.floor(Math.random() * 5) * CELL_HEIGHT +
      GRID_ROW_START_POS +
      CELL_PAD;
    if (this.frames % this.zombiesSpawnRate === 0) {
      let choice = Math.floor(Math.random() * this.zombiesTypes.length);
      this.zombies.push(
        new this.zombiesTypes[choice](
          this,
          canvas.width,
          selectedRow,
          CELL_WIDTH,
          CELL_HEIGHT
        )
      );
      this.zombiesPositions.push(selectedRow);
      this.zombiesSpawnRate -= this.zombiesSpawnRate > 300 ? 20 : 0;
    }
  }

  manageSuns() {
    if (this.frames % 300 === 0) {
      let x =
        Math.random() * (canvas.width - CELL_WIDTH * 2) + GRID_COL_START_POS;
      let y = Math.random() * 5 * CELL_HEIGHT + GRID_ROW_START_POS;
      this.suns.push(new Sun(this, x, y, 0));
    }

    this.suns.forEach((sun) => {
      sun.update();
      if (isCollided(sun, mouseStatus)) {
        this.sunCounts += sun.value;
        sun.collect = true;
      }
    });
  }

  cleanOrphanObjects() {
    this.suns = this.suns.filter((sun) => !sun.delete);
    this.zombies = this.zombies.filter((zombie) => !zombie.delete);
  }

  showResources() {
    ctx.drawImage(resourcescard, 20, 15, 145, 45);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    if (gameState.current === gameState.gameOver) {
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
    ctx.fillText(this.sunCounts.toString(), 79, 48);
  }

  animate = () => {
    ctx.fillStyle = "black";
    ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);
    this.drawGrid();
    this.manageAllZombies();
    this.showResources();
    this.manageSuns();
    this.cleanOrphanObjects();
    this.frames++;

    if (gameState.current !== gameState.gameOver)
      requestAnimationFrame(this.animate);
  };

  init() {
    this.grids = initializeGrid(Cell);
    this.addListeners();
    this.animate();
  }
}

export default Game;
