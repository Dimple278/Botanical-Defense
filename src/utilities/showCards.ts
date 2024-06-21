// showCards.ts
import {
  ctx,
  GRID_ROW_START_POS,
  CELL_HEIGHT,
  CELL_PAD,
  mouseStatus,
} from "../constants";
import { isCollided } from "./collision";
import { Game } from "../Game";

export function showCards(game: Game) {
  game.plantsTypes.forEach((plant, idx) => {
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
      idx === game.selectedPlant ? cardBoundary.w + 15 : cardBoundary.w,
      idx === game.selectedPlant ? cardBoundary.h + 8 : cardBoundary.h
    );

    if (isCollided(mouseStatus, cardBoundary) && mouseStatus.clicked) {
      game.selectedPlant = idx;
    }
  });
}
