import { Game } from "../Game";

export function cleanOrphanObjects(game: Game) {
  game.projectiles = game.projectiles.filter(
    (projectile) => !projectile.delete
  );
  game.suns = game.suns.filter((sun) => !sun.delete);
  game.zombies = game.zombies.filter((zombie) => !zombie.delete);
}
