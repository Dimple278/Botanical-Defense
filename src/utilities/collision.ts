import { Collision } from '../types';

export function collision(first: Collision, second: Collision): boolean {
  if (
    first.x === undefined ||
    first.y === undefined ||
    second.x === undefined ||
    second.y === undefined
  ) {
    return false;
  }

  return !(
    first.x + first.width < second.x ||
    first.x > second.x + second.width ||
    first.y + first.height < second.y ||
    first.y > second.y + second.height
  );
}
