import {
  canvas,
  ctx,
  CELL_HEIGHT,
  GRID_ROW_START_POS,
  PeaShooterCard,
  ThreePeaShooterCard,
  RepeaterCard,
  ChomperCard,
  WallNutCard,
  PotatoMinesCard,
  MelonPultCard,
  SpikeweedCard,
  SunflowerCard,
  LAWN_CLEANER_WIDTH,
} from "./constants";

import { initializeGrid } from "./utilities/gridUtils";

import Plant from "./components/Plants/Plant";
import PeaShooter from "./components/Plants/PeaShooter";
import Chomper from "./components/Plants/Chomper";
import Repeater from "./components/Plants/Repeater";
import PotatoMines from "./components/Plants/PotatoMines";
import ThreePeaShooter from "./components/Plants/ThreePeaShooter";
import Spikeweed from "./components/Plants/SpikeWeed";
import WallNut from "./components/Plants/Wallnut";
import MelonPult from "./components/Plants/Melon";
import Sunflower from "./components/Plants/Sunflower";

import Cell from "./components/Cell";
import Sun from "./components/Sun";
import LawnCleaner from "./components/LawnCleaner";

import Zombie from "./components/Zombies/Zombie";
import FootballZombie from "./components/Zombies/FootballZombie";
import ConeHeadZombie from "./components/Zombies/ConeHeadZombie";
import Projectile from "./components/Projectiles/Projectile";
import BucketHeadZombie from "./components/Zombies/BucketZombie";
import BallonZombie from "./components/Zombies/BalloonZombie";

import { animate } from "./animate";
import { addListeners } from "./addListeners";

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
  plantCooldownTime: number;
  selectedPlant: number;
  selectedPlantHoverImg: HTMLImageElement | undefined;
  frames: number;
  shovelSelected: boolean;
  zombiesTypes: (typeof Zombie)[];
  plantsTypes: { card: HTMLImageElement; blueprint: typeof Plant }[];
  score: number;
  volume: boolean;
  music: boolean;
  shovelBoundary: { x: number; y: number; w: number; h: number };
  musicBoundary: { x: number; y: number; w: number; h: number };
  volumeBoudnary: { x: number; y: number; w: number; h: number };

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
    this.plantCooldownTime = 5000;
    this.shovelSelected = false;
    this.music = true;
    this.volume = true;

    this.zombiesTypes = [
      Zombie,
      FootballZombie,
      ConeHeadZombie,
      BucketHeadZombie,
      BallonZombie,
    ];

    this.plantsTypes = [
      { card: SunflowerCard, blueprint: Sunflower },
      { card: PeaShooterCard, blueprint: PeaShooter },
      { card: RepeaterCard, blueprint: Repeater },
      { card: ThreePeaShooterCard, blueprint: ThreePeaShooter },
      { card: ChomperCard, blueprint: Chomper },
      { card: WallNutCard, blueprint: WallNut },
      { card: PotatoMinesCard, blueprint: PotatoMines },
      { card: SpikeweedCard, blueprint: Spikeweed },
      { card: MelonPultCard, blueprint: MelonPult },
    ];

    this.shovelBoundary = {
      x: 200,
      y: 15,
      w: 85,
      h: 85,
    };
    this.musicBoundary = {
      x: canvas.width - 300,
      y: 15,
      w: 40,
      h: 40,
    };

    this.volumeBoudnary = {
      x: canvas.width - 350,
      y: 15,
      w: 40,
      h: 40,
    };

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
    addListeners(this);
  }

  drawGrid() {
    this.grids.forEach((gridCell) => {
      gridCell.draw(ctx);
    });
  }

  animate = animate(this);

  init() {
    this.grids = initializeGrid(Cell);
    this.addListeners();
    this.animate();
  }
}

export default Game;
