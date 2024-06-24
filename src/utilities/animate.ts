// animate.ts
import { ctx, bg, canvas, gameState } from "../constants/constants";
import { Game } from "../Game";
import {
  handleAllPlants,
  handleAllProjectiles,
  handleSuns,
  handleLawnCleaners,
  handleShovel,
} from "../handlers/handlers";
import { handleAllZombies } from "../handlers/zombieHandler";
import { cleanOrphanObjects } from "../utilities/cleanOrphanObjects";
import { showResources } from "../utilities/showResources";
import { showCards } from "../utilities/showCards";
import { handleMusic } from "../handlers/audio handlers/musicHandler";
import { handleVolume } from "../handlers/audio handlers/volumeHandler";
import { handleFloatingMessages } from "../handlers/floatingMsgHandler";
import { updateScore } from "../utilities/highScore";

export function animate(game: Game) {
  return function () {
    ctx.fillStyle = "black";
    ctx.drawImage(bg, 0, 0, canvas.width + 573, canvas.height);

    game.drawGrid();
    handleAllPlants(game);
    handleAllZombies(game);
    handleAllProjectiles(game);
    handleSuns(game);
    showResources(game);
    handleLawnCleaners(game);
    cleanOrphanObjects(game);
    showCards(game);
    handleShovel(game);
    handleMusic(game);
    handleVolume(game);
    handleFloatingMessages(game);
    updateScore(game);
    game.frames++;

    if (gameState.current !== gameState.gameOver)
      requestAnimationFrame(game.animate);
  };
}
