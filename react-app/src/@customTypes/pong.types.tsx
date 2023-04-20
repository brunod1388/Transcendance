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

type BroadcastData = PositionBall | PositionPaddle | PositionPingPongPaddle | string | Score;

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
