import { Mouse } from './types';

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = 900;
canvas.height = 600;

export const CELL_SIZE = 100;
export const CELL_GAP = 3;
export const DEFENDER_COST = 100;

export const controllsBar = {
  width: canvas.width,
  height: CELL_SIZE,
};

export let canvasPosition = canvas.getBoundingClientRect();

export const mouse: Mouse = {
  x: undefined,
  y: undefined,
  width: 0.00001,
  height: 0.00001,
};
