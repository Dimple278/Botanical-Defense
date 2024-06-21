// animate.ts
import { ctx, bg, canvas, gameState } from "./constants";
import { Game } from "./Game";
import {
  manageAllPlants,
  manageAllZombies,
  manageAllProjectiles,
  manageSuns,
  manageLawnCleaners,
} from "./managers";
import { cleanOrphanObjects } from "./utilities/cleanOrphanObjects";
import { showResources } from "./utilities/showResources";
import { showCards } from "./utilities/showCards";

export function animate(game: Game) {
  return function () {
    ctx.fillStyle = "black";
    ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);
    game.drawGrid();
    manageAllPlants(game);
    manageAllZombies(game);
    manageAllProjectiles(game);
    showResources(game);
    manageSuns(game);
    manageLawnCleaners(game);
    cleanOrphanObjects(game);
    showCards(game);
    game.frames++;

    if (gameState.current !== gameState.gameOver)
      requestAnimationFrame(game.animate);
  };
}
