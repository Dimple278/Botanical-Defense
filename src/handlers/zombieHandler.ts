import Game from "../Game";
import {
  GRID_COL_START_POS,
  LAWN_CLEANER_WIDTH,
  gameState,
  CELL_HEIGHT,
  GRID_ROW_START_POS,
  CELL_PAD,
  canvas,
  CELL_WIDTH,
} from "../constants";

export function handleAllZombies(game: Game) {
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

  // Dynamic zombie spawn rate adjustment based on score
  if (game.score >= 150) {
    game.zombiesSpawnRate = Math.max(200, game.zombiesSpawnRate - 10); // Faster spawn rate
  } else if (game.score >= 100) {
    game.zombiesSpawnRate = Math.max(300, game.zombiesSpawnRate - 7); // Moderate spawn rate
  } else if (game.score >= 50) {
    game.zombiesSpawnRate = Math.max(400, game.zombiesSpawnRate - 5); // Slower spawn rate
  } else {
    game.zombiesSpawnRate = Math.max(500, game.zombiesSpawnRate - 3); // Initial slowest spawn rate
  }

  if (game.frames % game.zombiesSpawnRate === 0) {
    let maxZombieIndex = 0;

    if (game.score >= 200) {
      maxZombieIndex = 4; // Allow all types of zombies
    } else if (game.score >= 120) {
      maxZombieIndex = 3; // Allow up to the 4th type of zombie
    } else if (game.score >= 80) {
      maxZombieIndex = 2; // Allow up to the 3rd type of zombie
    } else {
      maxZombieIndex = 1; // Allow only the first and second types of zombies
    }

    let choice = Math.floor(Math.random() * (maxZombieIndex + 1));
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
  }
}
