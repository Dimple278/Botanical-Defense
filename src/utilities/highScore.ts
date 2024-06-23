import Game from "../Game";

// Utils.ts
export function getHighScore() {
  const highScore = localStorage.getItem("highScore");
  return highScore ? parseInt(highScore) : 0;
}

export function setHighScore(score: number) {
  localStorage.setItem("highScore", score.toString());
}

export function updateScore(game: Game) {
  //   game.score += points;
  if (game.score > game.highScore) {
    game.highScore = game.score;
    setHighScore(game.highScore);
  }
}
