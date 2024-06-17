import { CELL_SIZE,state, CANVAS } from './state';
import { Cell } from './Cell';


export function createGrid() {
    for (let y = CELL_SIZE; y < CANVAS.height; y += CELL_SIZE) {
        for (let x = 0; x < CANVAS.width; x += CELL_SIZE) {
            state.gameGrid.push(new Cell(x, y));
        }
    }
}

export function handleGameGrid() {
    for (let i = 0; i < state.gameGrid.length; i++) {
        state.gameGrid[i].draw();
    }
}
