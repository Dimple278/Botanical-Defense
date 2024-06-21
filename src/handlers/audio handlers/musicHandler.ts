import Game from "../../Game";
import { ctx, mouseStatus, musicImg, theme } from "../../constants";
import { isCollided } from "../../utilities/collision";

// Handle the music on and off function
export function handleMusic(game: Game) {
  // Toggles the music status
  if (isCollided(mouseStatus, game.musicBoundary) && mouseStatus.clicked) {
    game.music ? theme.pause() : theme.play();
    game.music = !game.music;

    // resets the mouse clicked status to false so that the
    // button is clicked only once
    mouseStatus.clicked = false;
  }

  // Draws the music icon
  ctx.drawImage(
    musicImg,
    game.musicBoundary.x,
    game.musicBoundary.y,
    game.musicBoundary.w,
    game.musicBoundary.h
  );
  if (!game.music) {
    ctx.fillStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      game.musicBoundary.x + game.musicBoundary.w,
      game.musicBoundary.y
    );
    ctx.lineTo(
      game.musicBoundary.x,
      game.musicBoundary.y + game.musicBoundary.h
    );
    ctx.stroke();
  }
}
