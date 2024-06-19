import Game from "./Game1.ts";
import { loadImages } from "./constants.ts";

window.onload = async () => {
  await loadImages();
  const game = new Game();
  game.init();
};
