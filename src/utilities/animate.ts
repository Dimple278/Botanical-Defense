import { ctx, controllsBar } from '../constants';

export function animate() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, controllsBar.width, controllsBar.height);
  requestAnimationFrame(animate);
}
