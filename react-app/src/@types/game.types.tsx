import { Position } from "./index";

export interface PlayerInfo {
    host: boolean;
    status: PlayerStatus;
    username: string;
	id: number;
}

export enum PlayerStatus {
    LOADING = "loading",
    CONNECTED = "connected",
    READY = "ready",
    PLAYING = "playing",
    DISCONECTED = "disconnected",
}

export const READY = PlayerStatus.READY;
export const LOADING = PlayerStatus.LOADING;
export const CONNECTED = PlayerStatus.CONNECTED;
export const DISCONECTED = PlayerStatus.DISCONECTED;

export const initialUser = (host: boolean, username: string): PlayerInfo => {
    return {
        host,
        username,
        status: LOADING,
		id: 0
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
		id: 0
    };
};

export enum GameMode {
    CLASSIC = "classic",
    PINGPONG = "pingpong",
}
export const CLASSIC = GameMode.CLASSIC;
export const PINGPONG = GameMode.PINGPONG;

export interface GameConfig {
    room: string;
    status: GameStatus;
    boardWidth: number;
    boardHeight: number;
    ballRayon: number;
    ballMaxBounceAngle: number;
    paddleWidth: number;
    paddleHeight: number;
    initialBall: Ball;
    initialPaddle1: Paddle;
    initialPaddle2: Paddle;
}

export enum GameStatus {
    LOADING,
    BEGIN,
    LAUNCH_BALL,
    MOVE_BALL,
    PAUSE_AFTER_SCORE,
    RESET,
    END_GAME,
    OPPONENT_LEFT,
}
export interface Ball {
    pos: Position;
    delta: Position;
    speed: number;
}

export type Paddle = Position;

enum ScoreStatus {
    LOST = "lost",
    WON = "won",
}
export const WON = ScoreStatus.WON;
export const LOST = ScoreStatus.LOST;

export const END_GAME = GameStatus.END_GAME;
