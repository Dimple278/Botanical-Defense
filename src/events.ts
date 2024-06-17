import { CANVAS, state } from './state';

export function setupMouseEvents() {
    state.canvasPosition = CANVAS.getBoundingClientRect();

    CANVAS.addEventListener('mousemove', (e: MouseEvent) => {
        state.mouse.x = e.clientX - state.canvasPosition.left;
        state.mouse.y = e.clientY - state.canvasPosition.top;
    });

    window.addEventListener('resize', () => {
        state.canvasPosition = CANVAS.getBoundingClientRect();
    });
}
