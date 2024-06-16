  import { ctx, controllsBar,canvas} from '../constants';
  import { handleGrid } from '../gameGrid';

  export function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, controllsBar.width, controllsBar.height);
    handleGrid();
    requestAnimationFrame(animate);
  }