export const RAYON = 5;
export const WIDTH = 250;
export const HEIGHT = 250;
export const TOP_WALL = 250;
export const BOTTOM_WALL = 0;
export const LEFT_WALL = 0;
export const RIGHT_WALL = WIDTH;
export const MAXBOUNCEANGLE = (5 * Math.PI) / 12; //5*Pi/12 radians
export const PADDLE_WIDTH = 5;
export const PADDLE_HEIGHT = 30;
export const BALL_RADIUS = 5;
export const LEFT_PADDLE = 10;
export const RIGHT_PADDLE = 230;

export const PLAYING = 0;
export const WIN = 1;
export const LEFT = 2;

export interface Position {
    x: number;
    y: number;
}

export class Position implements Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export interface Score {
    player1: number;
    player2: number;
}

export class Score implements Score {
    player1: number;
    player2: number;

    constructor(player1: number, player2: number) {
        this.player1 = player1;
        this.player2 = player2;
    }
}

export interface Broadcast {
    room: string;
    event: string;
    data: BroadcastData;
}

export class Broadcast implements Broadcast {
    room: string;
    event: string;
    data: BroadcastData;
    constructor(room: string, event: string, data: BroadcastData) {
        this.room = room;
        this.event = event;
        this.data = data;
    }
}

type BroadcastData = PositionBall | PositionPaddle | string | Score;

interface PositionBall {
    x: number;
    y: number;
}

interface PositionPaddle {
    y: number;
}

export interface GameInfo {
    player1: string;
    player2: string;
}
