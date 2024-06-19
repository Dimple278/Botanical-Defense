import Game from "./Game";
import { loadImages } from "./constants";

const game = new Game();
window.onload = async () => {
  await loadImages();
  game.init();
};
