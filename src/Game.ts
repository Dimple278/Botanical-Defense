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
} from "./constants";
import { isCollided } from "./utilities/collision";
import { initializeGrid } from "./utilities/gridUtils";
import Plant, {
  PeaShooter,
  Repeater,
  Sunflower,
  ThreePeashooter,
  Wallnut,
} from "./classes/Plant";
import Cell from "./classes/Cell";
import Sun from "./classes/Sun";
import LawnCleaner from "./classes/LawnCleaner";
import Zombie from "./classes/Zombie";
import Projectile from "./classes/Projectile";

// interface Position {
//   x: number;
//   y: number;
// }

class Game {
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
  plantsTypes: { card: HTMLImageElement; blueprint: typeof Plant }[];

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

    this.zombiesTypes = [Zombie];

    this.plantsTypes = [
      { card: SunflowerCard, blueprint: Sunflower },
      { card: PeaShooterCard, blueprint: PeaShooter },
      { card: RepeaterCard, blueprint: Repeater },
      { card: ThreePeaShooterCard, blueprint: ThreePeashooter },
      //   { card: ChomperCard, blueprint: Chomper },
      { card: WallNutCard, blueprint: Wallnut },
      //   { card: PotatoMinesCard, blueprint: PotatoMines },
      //   { card: SpikeweedCard, blueprint: Spikeweed },
      //   { card: MelonPultCard, blueprint: MelonPult },
    ];
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

    canvas.addEventListener("click", () => {
      let cellPosX: number | undefined;
      let cellPosY: number | undefined;
      let plantCost = 25;

      this.grids.every((cell) => {
        if (isCollided(cell, mouseStatus)) {
          cellPosX = cell.x + CELL_PAD;
          cellPosY = cell.y + CELL_PAD;
          return false;
        }
        return true;
      });

      if (
        cellPosX === undefined ||
        cellPosY === undefined ||
        cellPosX < GRID_COL_START_POS ||
        cellPosY < GRID_ROW_START_POS
      ) {
        return;
      }

      for (let i = 0; i < this.plants.length; i++) {
        if (this.plants[i].x === cellPosX && this.plants[i].y === cellPosY) {
          return;
        }
      }

      if (plantCost <= this.sunCounts) {
        this.plants.push(
          new this.plantsTypes[this.selectedPlant].blueprint(
            this,
            cellPosX,
            cellPosY,
            CELL_WIDTH - 25,
            CELL_HEIGHT - 25
          )
        );
        this.sunCounts -= plantCost;
      }
    });
  }

  drawGrid() {
    this.grids.forEach((gridCell) => {
      gridCell.draw(ctx);
    });
  }

  manageAllPlants() {
    this.plants.forEach((plant) => {
      plant.update();
    });
    this.plants = this.plants.filter((plant) => plant.health > 0);
  }

  manageAllProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
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

  manageLawnCleaners() {
    this.lawnCleaners.forEach((lawncleaner) => {
      lawncleaner.update();
    });
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

  showCards() {
    this.plantsTypes.forEach((plant, idx) => {
      let cardBoundary = {
        x: 20,
        y: GRID_ROW_START_POS + 80 * idx,
        w: 100,
        h: 60,
      };
      let cardY = GRID_ROW_START_POS + 80 * idx;

      ctx.drawImage(
        plant.card,
        0,
        0,
        cardBoundary.w,
        cardBoundary.h,
        cardBoundary.x,
        cardY,
        idx === this.selectedPlant ? cardBoundary.w + 15 : cardBoundary.w,
        idx === this.selectedPlant ? cardBoundary.h + 8 : cardBoundary.h
      );

      if (isCollided(mouseStatus, cardBoundary) && mouseStatus.clicked) {
        this.selectedPlant = idx;
      }
    });
  }

  animate = () => {
    ctx.fillStyle = "black";
    ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);
    this.drawGrid();
    this.manageAllProjectiles();
    this.showResources();
    this.manageSuns();
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
