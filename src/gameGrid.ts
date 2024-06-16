import { canvas, CELL_SIZE } from './constants';
import { Cell } from './Cell';

export const gameGrid: Cell[] = [];

export function createGrid() {
  for (let y = CELL_SIZE; y < canvas.height; y += CELL_SIZE) {
    for (let x = 0; x < canvas.width; x += CELL_SIZE) {
      gameGrid.push(new Cell(x, y));
    }
  }
}

export function handleGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}
