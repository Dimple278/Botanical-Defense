import { ctx, GRID_ROW_START_POS, mouseStatus } from "../constants/constants";
import { isCollided } from "./collision";
import { Game } from "../Game";

export function showCards(game: Game) {
  game.plantsTypes.forEach((plant, idx) => {
    //  Sets the default boundary
    let cardBoundary = {
      x: 20,
      y: GRID_ROW_START_POS + 90 * idx,
      w: 100,
      h: 60,
    };
    let cardY = GRID_ROW_START_POS + 90 * idx;

    //Draws the card
    ctx.drawImage(
      plant.card,
      0,
      plant.canPlant || idx === 8 ? 1 : 61,
      cardBoundary.w,
      cardBoundary.h,
      cardBoundary.x,
      cardY,
      idx === game.selectedPlant ? cardBoundary.w + 15 : cardBoundary.w,
      idx === game.selectedPlant ? cardBoundary.h + 8 : cardBoundary.h
    );

    // Adds the cost of the plant
    ctx.font = "23px Creepster";
    ctx.fillText(
      plant.blueprint.cost.toString(),
      cardBoundary.x + cardBoundary.w - 32,
      cardBoundary.y + cardBoundary.h - 18
    );

    // Clicked plant is selected from the card
    if (isCollided(mouseStatus, cardBoundary) && mouseStatus.clicked) {
      game.selectedPlant = idx;
    }
  });
}
