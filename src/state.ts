import { Cell } from './Cell';
import { Mouse, Defender, Enemy, Projectile, Resource,IFloatingMsg} from './types';

export const CANVAS = document.getElementById('canvas1') as HTMLCanvasElement;
export const CTX = CANVAS.getContext('2d') as CanvasRenderingContext2D;
CANVAS.width = 900;
CANVAS.height = 600;

export const CELL_SIZE = 100;
export const CELL_GAP = 3;
export const SELECTED_DEFENDER = 1;
export const WINNING_SCORE = 20;
export const DEFENDER_COST = 100;


// Good to be feature : SingleTon class to track the game state, simple class to tract game state
export const state = {
    numberOfResources: DEFENDER_COST * 1.5,
    gameGrid: [] as Cell[],
    gameOver: false,
    frame: 0,
    score: 0,
    enemiesInterval: 1000,
    mouse: {
        x: 5,
        y: 5 ,
        width: 0.00001,
        height: 0.00001,
    } as Mouse,
    canvasPosition: CANVAS.getBoundingClientRect(),
    projectiles: [] as Projectile[],
    defenders: [] as Defender[],
    enemies: [] as Enemy[],
    enemyPositions: [] as number[],
    resources: [] as Resource[],
    controlsBar: {
        width: CANVAS.width,
        height: CELL_SIZE,
    },
    floatingMsg:[] as IFloatingMsg[],
};
