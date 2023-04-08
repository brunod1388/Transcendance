export const RAYON = 5;

export const WIDTH = 640;
export const HEIGHT = 480;
export const MIDDLEY = HEIGHT / 2;
export const TOP_WALL = HEIGHT;
export const BOTTOM_WALL = 0;
export const LEFT_WALL = 0;
export const RIGHT_WALL = WIDTH;
export const MAXBOUNCEANGLE = 1.0472; //5*Pi/12 radians
export const PADDLE_WIDTH = 10;
export const PADDLE_HEIGHT = 80;
export const BALL_RADIUS = 10;
export const LEFT_PADDLE = 20;
export const RIGHT_PADDLE = WIDTH - LEFT_PADDLE;
export const WALL_TO_PADDLE = 10;

export const WIN1 = 1;
export const WIN2 = 3;
export const LEFT = 2;

export interface Position {
    x: number;
    y: number;
}

export interface Score {
    player1: number;
    player2: number;
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

type BroadcastData =
    | PositionBall
    | PositionPaddle
    | PositionPingPongPaddle
    | string
    | Score;

interface PositionBall {
    x: number;
    y: number;
}

export interface PositionPingPongPaddle {
    pos: Position;
    movement: Position;
}

interface PositionPaddle {
    y: number;
}

export interface GameInfo {
    player1: string;
    player2: string;
}

export interface Range {
    min: number;
    max: number;
}
