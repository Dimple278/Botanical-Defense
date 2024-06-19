import Game from "./Game.ts";
import { loadImages } from "./constants.ts";

window.onload = async () => {
  await loadImages();
  const game = new Game();
  game.init();
};
