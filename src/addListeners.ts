// addListeners.ts
import {
  canvas,
  mouseStatus,
  CELL_PAD,
  GRID_COL_START_POS,
  GRID_ROW_START_POS,
  gameState,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "./constants";
import { isCollided } from "./utilities/collision";
import { Game } from "./Game";

export function addListeners(game: Game) {
  window.addEventListener("resize", () => {
    game.canvasPosition = canvas.getBoundingClientRect();
  });

  canvas.addEventListener("mousemove", (e) => {
    mouseStatus.x = e.x - game.canvasPosition.left;
    mouseStatus.y = e.y - game.canvasPosition.top;
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

    game.grids.every((cell) => {
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

    for (let i = 0; i < game.plants.length; i++) {
      if (game.plants[i].x === cellPosX && game.plants[i].y === cellPosY) {
        return;
      }
    }

    if (plantCost <= game.sunCounts) {
      game.plants.push(
        new game.plantsTypes[game.selectedPlant].blueprint(
          game,
          cellPosX,
          cellPosY,
          CELL_WIDTH - 25,
          CELL_HEIGHT - 25
        )
      );
      game.sunCounts -= plantCost;
    }
  });
}
