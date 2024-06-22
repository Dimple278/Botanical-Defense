// animate.ts
import { ctx, bg, canvas, gameState } from "./constants";
import { Game } from "./Game";
import {
  handleAllPlants,
  handleAllZombies,
  handleAllProjectiles,
  handleSuns,
  handleLawnCleaners,
  handleShovel,
} from "./handlers/handlers";
import { cleanOrphanObjects } from "./utilities/cleanOrphanObjects";
import { showResources } from "./utilities/showResources";
import { showCards } from "./utilities/showCards";
import { handleMusic } from "./handlers/audio handlers/musicHandler";
import { handleVolume } from "./handlers/audio handlers/volumeHandler";
const endPage = document.getElementById("end-page") as HTMLDivElement;

export function animate(game: Game) {
  return function () {
    ctx.fillStyle = "black";
    ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);

    game.drawGrid();
    handleAllPlants(game);
    handleAllZombies(game);
    handleAllProjectiles(game);
    showResources(game);
    handleSuns(game);
    handleLawnCleaners(game);
    cleanOrphanObjects(game);
    showCards(game);
    handleShovel(game);
    handleMusic(game);
    handleVolume(game);
    game.frames++;

    if (gameState.current !== gameState.gameOver)
      requestAnimationFrame(game.animate);
  };
}
