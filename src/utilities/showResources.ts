import {
  ctx,
  resourcescard,
  gameState,
  canvas,
  Button,
} from "../constants/constants";
import { Game } from "../Game";

export function showResources(game: Game) {
  ctx.drawImage(resourcescard, 20, 15, 145, 45);

  ctx.fillStyle = "black";
  ctx.font = "30px Creepster";
  ctx.fillText(game.sunCounts.toString(), 79, 48);

  ctx.fillStyle = "#ffe9ac";
  ctx.drawImage(Button, 20, 70, 135, 50);
  ctx.fillText(`Score ${game.score}`, 39, 101);

  // Draw the HighScore
  ctx.font = "25px Creepster";
  ctx.fillStyle = "#ffe9ac";
  ctx.drawImage(Button, canvas.width - 225, 10, 225, 60);
  ctx.fillText(`High Score: ${game.highScore}`, canvas.width - 195, 44);

  // Check if the game is over to display the special message
  if (gameState.current === gameState.gameOver) {
    // Save the current context state
    ctx.save();

    ctx.fillStyle = "red";
    ctx.font = "120px Creepster";

    // Center the text horizontally
    ctx.textAlign = "center";

    // Draw the game over message
    ctx.fillText(
      "THE ZOMBIES ATE YOUR BRAINS!",
      canvas.width / 2,
      canvas.height / 2
    );

    // Restore the original context state
    ctx.restore();
  }
}
