import Game from "../Game";

export default function handleAllPlants(game: Game) {
  game.plants.forEach((plant) => {
    plant.update();
  });
  game.plants = game.plants.filter((plant) => plant.health > 0);
}
