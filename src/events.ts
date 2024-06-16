import { mouse, canvas } from './constants';

export function setupMouseEvents() {
  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });
  
}
