import Game from "../../Game";
import { ctx, mouseStatus, volumeImg } from "../../constants/constants";
import { isCollided } from "../../utilities/collision";

// Manages Sound
export function handleVolume(game: Game) {
  if (isCollided(mouseStatus, game.volumeBoudnary) && mouseStatus.clicked) {
    game.volume = !game.volume;
    mouseStatus.clicked = false;
  }

  // Draws the volume icon
  ctx.drawImage(
    volumeImg,
    game.volumeBoudnary.x,
    game.volumeBoudnary.y,
    game.volumeBoudnary.w,
    game.volumeBoudnary.h
  );

  if (!game.volume) {
    ctx.fillStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      game.volumeBoudnary.x + game.volumeBoudnary.w,
      game.volumeBoudnary.y
    );
    ctx.lineTo(
      game.volumeBoudnary.x,
      game.volumeBoudnary.y + game.volumeBoudnary.h
    );
    ctx.stroke();
  }
}
