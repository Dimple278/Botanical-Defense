import { canvas, CELL_HEIGHT, CELL_WIDTH, GRID_ROW_START_POS, GRID_COL_START_POS } from "../constants";
import Cell from "../classes/Cell";

// Initializes the game grid
export const initializeGrid = (CellClass: typeof Cell): Cell[] => {
    const gridsList: Cell[] = [];
    for (let row = GRID_ROW_START_POS; row < canvas.height - CELL_HEIGHT; row += CELL_HEIGHT) {
        for (let col = GRID_COL_START_POS; col < canvas.width - CELL_WIDTH * 2; col += CELL_WIDTH) {
            gridsList.push(new CellClass(col, row, CELL_WIDTH, CELL_HEIGHT));
        }
    }
    return gridsList;
};
