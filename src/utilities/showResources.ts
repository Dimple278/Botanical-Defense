// showResources.ts
import { ctx, resourcescard, gameState, canvas, Button } from "../constants";
import { Game } from "../Game";

export function showResources(game: Game) {
  ctx.drawImage(resourcescard, 20, 15, 145, 45);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  if (gameState.current === gameState.gameOver) {
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  }
  ctx.fillText(game.sunCounts.toString(), 79, 48);

  ctx.fillStyle = "#ffe9ac";
  ctx.drawImage(Button, 20, 70, 135, 50);
  ctx.fillText(`Score ${game.score}`, 39, 101);
}
