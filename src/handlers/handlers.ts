import {
  GRID_COL_START_POS,
  GRID_ROW_START_POS,
  CELL_HEIGHT,
  CELL_WIDTH,
  canvas,
  mouseStatus,
  ctx,
  ShovelImg,
  ShovelBtn,
} from "../constants";
import { isCollided } from "../utilities/collision";
import Sun from "../components/Sun";
import { Game } from "../Game";

export function handleAllPlants(game: Game) {
  game.plants.forEach((plant) => {
    plant.update();
  });
  game.plants = game.plants.filter((plant) => plant.health > 0);
}

export function handleAllProjectiles(game: Game) {
  game.projectiles.forEach((projectile) => {
    projectile.update();
  });
}

export function handleSuns(game: Game) {
  if (game.frames % 350 === 0) {
    const sunWidth = CELL_WIDTH - 50;
    const sunHeight = CELL_HEIGHT - 25;

    const x =
      Math.random() * (canvas.width - sunWidth - CELL_WIDTH * 2) +
      GRID_COL_START_POS;
    const y =
      Math.random() * (canvas.height - sunHeight - GRID_ROW_START_POS * 2) +
      GRID_ROW_START_POS;

    game.suns.push(new Sun(game, x, y, 0));
  }

  game.suns.forEach((sun) => {
    sun.update();
    if (isCollided(sun, mouseStatus)) {
      game.sunCounts += sun.value;
      sun.collect = true;
    }
  });

  // Remove collected suns
  // game.suns = game.suns.filter((sun) => !sun.collect);
}

export function handleLawnCleaners(game: Game) {
  game.lawnCleaners.forEach((lawncleaner) => {
    lawncleaner.update();
  });
}

export function handleShovel(game: Game) {
  // Selects the shovel when clicked on the shovel button
  if (isCollided(mouseStatus, game.shovelBoundary) && mouseStatus.clicked) {
    game.shovelSelected = true;
  }

  // Draws the shovel button if the shovel is not selected else
  // the shovel is drawn where the mouse position is
  if (!game.shovelSelected) {
    ctx.drawImage(ShovelBtn, 200, 15, 85, 85);
  } else {
    ctx.drawImage(
      ShovelImg,
      mouseStatus.x - game.shovelBoundary.w / 2,
      mouseStatus.y - game.shovelBoundary.h / 2,
      game.shovelBoundary.w,
      game.shovelBoundary.h
    );
  }
}
