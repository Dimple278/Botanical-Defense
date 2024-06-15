export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = 900;
canvas.height = 600;

export const cellSize = 100;
export const cellGap = 3;

export const controllsBar = {
  width: canvas.width,
  height: cellSize,
};

