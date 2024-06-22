import {
  canvas,
  mouseStatus,
  CELL_PAD,
  GRID_COL_START_POS,
  GRID_ROW_START_POS,
  CELL_WIDTH,
  CELL_HEIGHT,
  clickSound,
  theme,
  gameState,
} from "./constants";
import { isCollided } from "./utilities/collision";
import { Game } from "./Game";
const startPage = document.getElementById("start-page") as HTMLDivElement;

export function addListeners(game: Game) {
  window.addEventListener("resize", () => {
    game.canvasPosition = canvas.getBoundingClientRect();
  });

  game.startBtn.addEventListener("click", () => {
    startPage.style.visibility = "hidden";
    theme.play();
    theme.volume = 0.3;
    theme.loop = true;
    // game.init();
    game.animate();
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
    game.volume && clickSound.play();
    let cellPosX: number | undefined;
    let cellPosY: number | undefined;
    let plantCost = 25;

    // Find the collided cell and extracts it's position
    game.grids.every((cell) => {
      if (isCollided(cell, mouseStatus)) {
        cellPosX = cell.x + CELL_PAD;
        cellPosY = cell.y + CELL_PAD;
        return false;
      }
      return true;
    });

    // Stops from placing the plants outside of the grid
    if (
      cellPosX === undefined ||
      cellPosY === undefined ||
      cellPosX < GRID_COL_START_POS ||
      cellPosY < GRID_ROW_START_POS
    ) {
      // Unselect the shovel if selected
      if (
        game.shovelSelected &&
        !isCollided(mouseStatus, game.shovelBoundary)
      ) {
        game.shovelSelected = false;
      }
      return;
    }

    // Checks whether there is already a plant in selected cell
    for (let i = 0; i < game.plants.length; i++) {
      if (game.plants[i].x === cellPosX && game.plants[i].y === cellPosY) {
        // If the shovel is selected then remove the plant
        if (game.shovelSelected) {
          game.plants.splice(i, 1);
          game.shovelSelected = false;
        }
        return;
      }
    }

    //If the user has required number of sun then the plant is placed at the selected cell position
    let CurrentPlant = game.plantsTypes[game.selectedPlant];
    if (
      !game.shovelSelected &&
      CurrentPlant.canPlant &&
      CurrentPlant.blueprint.cost <= game.sunCounts
    ) {
      game.plants.push(
        new CurrentPlant.blueprint(
          game,
          cellPosX,
          cellPosY,
          CELL_WIDTH - 25,
          CELL_HEIGHT - 25
        )
      );

      // Subtract the cost of the plant from the sun count
      game.sunCounts -= CurrentPlant.blueprint.cost;

      // Make the plant cannot be placed again until the cooldown time
      CurrentPlant.canPlant = false;
      setTimeout(() => {
        CurrentPlant.canPlant = true;
      }, game.plantCooldownTime);
    }

    game.shovelSelected = false;
  });
}
