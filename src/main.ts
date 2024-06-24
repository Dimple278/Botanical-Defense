import Game from "./Game.ts";
import { loadImages, loading } from "./constants.ts";

window.onload = async () => {
  await loadImages();
  if (loading instanceof HTMLElement) {
    loading.style.display = "none";
  } else {
    console.error("Loading element is not found or is not an HTMLElement");
  }
  const game = new Game();
  game.init();
};
