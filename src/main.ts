import Game from "./Game.ts";
import { loadImages, loading } from "./constants/constants.ts";

window.onload = async () => {
  await loadImages();
  const game = new Game();

  if (loading instanceof HTMLElement) {
    loading.style.display = "none";
  }
  // else {
  //   console.error("Loading element is not found or is not an HTMLElement");
  // }

  const startBtn = game.startBtn;
  if (startBtn instanceof HTMLElement) {
    startBtn.classList.remove("hide");
  }
  // else {
  //   console.error("Start button element is not found or is not an HTMLElement");
  // }

  game.init();
};
