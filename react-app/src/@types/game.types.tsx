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
    Position,
    WALL_TO_PADDLE,
} from "./index";

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

export const initialUser = (host: boolean, username: string): PlayerInfo => {
    return {
        host,
        username,
        status: LOADING,
    };
};

export const initialOpponent = (
    host: boolean,
    username: string
): PlayerInfo => {
    return {
        host,
        username,
        status: LOADING,
    };
};

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
    initialBall: Ball;
    initialPaddle1: Paddle;
    initialPaddle2: Paddle;
}

export type Players = {
    player1: PlayerInfo;
    player2: PlayerInfo;
};

export interface PlayerInfo {
    host: boolean;
    status: PlayerStatus;
    username: string;
}

export enum PlayerStatus {
    LOADING = "loading",
    CONNECTED = "connected",
    READY = "ready",
    PLAYING = "playing",
    DISCONECTED = "disconnected",
}

enum ScoreStatus {
    LOST = "lost",
    WON = "won",
}

export const LOST = ScoreStatus.LOST;
export const WON = ScoreStatus.WON;

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
    LOADING,
    BEGIN,
    LAUNCH_BALL,
    MOVE_BALL,
    PAUSE_AFTER_SCORE,
    RESET,
    END_GAME,
}

export enum GameMode {
    CLASSIC = "classic",
    PINGPONG = "pingpong",
}

export interface Ball {
    pos: Position;
    delta: Position;
    speed: number;
}

export type Paddle = Position;
export const END_GAME = GameStatus.END_GAME;
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
    username: "",
};

export const classicConfig: GameConfig = {
    status: GameStatus.LOADING,
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
    initialBall: {
        pos: { x: WIDTH / 2, y: HEIGHT / 2 },
        delta: { x: 0, y: 0 },
        speed: 0,
    },
    initialPaddle1: { x: WALL_TO_PADDLE, y: WIDTH - WALL_TO_PADDLE },
    initialPaddle2: { x: WIDTH - WALL_TO_PADDLE, y: WALL_TO_PADDLE },
};

export const pingpongConfig: GameConfig = {
    status: GameStatus.LOADING,
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
    initialBall: {
        pos: { x: WIDTH / 2, y: HEIGHT / 2 },
        delta: { x: 0, y: 0 },
        speed: 0,
    },
    initialPaddle1: { x: WALL_TO_PADDLE, y: WIDTH - WALL_TO_PADDLE },
    initialPaddle2: { x: WIDTH - WALL_TO_PADDLE, y: WALL_TO_PADDLE },
};
