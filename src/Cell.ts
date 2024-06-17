import { CTX, CELL_SIZE, state } from './state';
import { Cell as CellInterface } from './types';
import { collision } from './utilities/collision';

export class Cell implements CellInterface {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.width = CELL_SIZE;
      this.height = CELL_SIZE;
  }

  draw() {
      CTX.fillStyle = 'black';
      if (collision(this, state.mouse)) {
          CTX.lineWidth = 3;
          CTX.strokeRect(this.x + 3, this.y + 3, this.width - 6, this.height - 6);
      }
      else {
        CTX.strokeStyle = "gray";
        CTX.strokeRect(this.x +3, this.y+3, this.width -6 , this.height-6);
      }
  
  }
}
