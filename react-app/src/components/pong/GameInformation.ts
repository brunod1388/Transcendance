import { Position } from "../../@types";
import {
    MIDDLEY,
    WIDTH,
    BALL_RADIUS,
    HEIGHT,
    LEFT_PADDLE,
    MAXBOUNCEANGLE,
    PADDLE_HEIGHT,
    PADDLE_WIDTH,
    RAYON,
    RIGHT_PADDLE,
} from "../../@types";

export interface Game {
    Ball: GameBall;
    Wall: GameWall;
    Paddle1: GamePaddle;
    Paddle2: GamePaddle;
}

export interface GameBall {
    pos: Position;
    speed: number;
}

export interface GameWall {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export interface GamePaddle {
    pos: Position;
}

export interface GameConfig {
    status: GameStatus;
    boardWidth: number;
    boardHeight: number;
    ballRayon: number;
    ballRadius: number;
    ballMaxBounceAngle: number;
    paddleStart: Position[];
    paddleWidth: number;
    paddleHeight: number;
    room: string;
}



export type Players = {
    player1: PlayerInfo;
    player2: PlayerInfo;
};

export interface PlayerInfo {
    host: boolean;
    status: PlayerStatus;
    username: string | null;
}

export enum PlayerStatus {
    LOADING = "loading",
    CONNECTED = "connected",
    READY = "ready",
    PLAYING = "playing",
    DISCONECTED = "disconnected",
}

// enum ballSkins {
// 	CLASSIC,
// 	TENNIS,
// 	GOLF
// }

// enum paddleSkins {
// 	BRICK,
// 	MINIMALIST,
// 	CHIC
// }

// interface Skins {
// 	ball?: ballSkins,
// 	paddle?: paddleSkins

// }

// interface MyProfile {
// 	status?: PlayerStatus;
// 	username?: string;
// 	skins?: Skins;
// }

export enum GameStatus {
    PLAYING,
    WIN,
    LOST,
}

export enum GameMode {
    CLASSIC = "classic",
    PINGPONG = "pingpong",
}

export const CLASSIC = GameMode.CLASSIC;
export const PINGPONG = GameMode.PINGPONG;
export const LOADING = PlayerStatus.LOADING;
export const CONNECTED = PlayerStatus.CONNECTED;
export const DISCONECTED = PlayerStatus.DISCONECTED;
export const READY = PlayerStatus.READY;
export const PLAYING = PlayerStatus.PLAYING;

export const initialPlayer: PlayerInfo = {
    host: false,
    status: LOADING,
    username: null,
};


export const classicConfig: GameConfig = {
    status: GameStatus.PLAYING,
    boardWidth: WIDTH,
    boardHeight: HEIGHT,
    ballRayon: RAYON,
    ballRadius: BALL_RADIUS,
    ballMaxBounceAngle: MAXBOUNCEANGLE,
    paddleStart: [
        { x: LEFT_PADDLE, y: MIDDLEY },
        { x: RIGHT_PADDLE, y: MIDDLEY },
    ],
    paddleWidth: PADDLE_WIDTH,
    paddleHeight: PADDLE_HEIGHT,
    room: "",
};

export const pingpongConfig: GameConfig = {
    status: GameStatus.PLAYING,
    boardWidth: WIDTH,
    boardHeight: HEIGHT,
    ballRayon: RAYON,
    ballRadius: BALL_RADIUS,
    ballMaxBounceAngle: MAXBOUNCEANGLE,
    paddleStart: [
        { x: LEFT_PADDLE, y: MIDDLEY },
        { x: RIGHT_PADDLE, y: MIDDLEY },
    ],
    paddleWidth: PADDLE_WIDTH,
    paddleHeight: PADDLE_HEIGHT,
    room: "",
};