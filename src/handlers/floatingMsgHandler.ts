import Game from "../Game";

export function handleFloatingMessages(game: Game) {
  for (let i = 0; i < game.floatingMsgs.length; i++) {
    game.floatingMsgs[i].update();
    game.floatingMsgs[i].draw();
    if (game.floatingMsgs[i].lifeSpan >= 50) {
      game.floatingMsgs.splice(i, 1);
      i--;
    }
  }
}
