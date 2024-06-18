export interface Mouse {
    x: number | undefined;
    y: number | undefined;
    width: number;
    height: number;
}

export interface Cell {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Collision {
    x: number | undefined;
    y: number | undefined;
    width: number;
    height: number;
}

export interface Defender {
    x: number;
    y: number;
    width: number;
    height: number;
    shooting: boolean;
    projectiles: Projectile[];
    timer: number;
    health: number;
    draw: () => void;
    update: () => void;
}

export interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    movement: number;
    health: number;
    update: () => void;
    draw: () => void;
}

export interface Projectile {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    power: number;
    update: () => void;
    draw: () => void;
}

export interface Resource {
    x: number;
    y: number;
    width: number;
    height: number;
    amount: number;
    update: () => void;
    draw: () => void;
}

export interface IFloatingMsg{
    value: string;
    x: number;
    y: number;
    size: number;
    color: string;
    lifeSpan: number;
    opacity: number;
    update: () => void;
    draw: () => void;
}