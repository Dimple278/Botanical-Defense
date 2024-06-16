import { ctx, CELL_SIZE, mouse } from './constants';
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
    if(collision(this,mouse)){
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    else {
      ctx.strokeStyle = "gray";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
