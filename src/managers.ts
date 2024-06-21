// managers.ts
import {
  gameState,
  GRID_COL_START_POS,
  GRID_ROW_START_POS,
  LAWN_CLEANER_WIDTH,
  CELL_HEIGHT,
  CELL_WIDTH,
  CELL_PAD,
  canvas,
  mouseStatus,
} from "./constants";
import { isCollided } from "./utilities/collision";
import Sun from "./components/Sun";
import { Game } from "./Game";

export function manageAllPlants(game: Game) {
  game.plants.forEach((plant) => {
    plant.update();
  });
  game.plants = game.plants.filter((plant) => plant.health > 0);
}

export function manageAllZombies(game: Game) {
  game.zombies.forEach((zombie) => {
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
    Math.floor(Math.random() * 5) * CELL_HEIGHT + GRID_ROW_START_POS + CELL_PAD;

  if (game.frames % game.zombiesSpawnRate === 0) {
    let choice = Math.floor(Math.random() * game.zombiesTypes.length);
    game.zombies.push(
      new game.zombiesTypes[choice](
        game,
        canvas.width,
        selectedRow,
        CELL_WIDTH,
        CELL_HEIGHT
      )
    );
    game.zombiesPositions.push(selectedRow);
    game.zombiesSpawnRate -= game.zombiesSpawnRate > 300 ? 20 : 0;
  }
}

export function manageAllProjectiles(game: Game) {
  game.projectiles.forEach((projectile) => {
    projectile.update();
  });
}

export function manageSuns(game: Game) {
  if (game.frames % 300 === 0) {
    let x =
      Math.random() * (canvas.width - CELL_WIDTH * 2) + GRID_COL_START_POS;
    let y = Math.random() * 5 * CELL_HEIGHT + GRID_ROW_START_POS;
    game.suns.push(new Sun(game, x, y, 0));
  }

  game.suns.forEach((sun) => {
    sun.update();
    if (isCollided(sun, mouseStatus)) {
      game.sunCounts += sun.value;
      sun.collect = true;
    }
  });
}

export function manageLawnCleaners(game: Game) {
  game.lawnCleaners.forEach((lawncleaner) => {
    lawncleaner.update();
  });
}
