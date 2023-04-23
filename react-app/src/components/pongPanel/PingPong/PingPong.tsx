import { Rules } from "./Rules";
import { Board } from "./Board";
import { BallComponent } from "../components/Ball";
import { MyPaddle, YourPaddle } from "./Paddle";
import { Ball, GameConfig, PlayerInfo, Position, Score } from "@customTypes";
import { CSSProperties, useEffect, useState } from "react";
interface Props {
    host: boolean;
    room: string;
    config: GameConfig;
    user: PlayerInfo;
    opponent: PlayerInfo;
    ball: Ball;
    score: Score;
    userPaddle: Position;
    opponentPaddle: Position;
    onUserPaddle: (pos: Position) => void;
    onOpponentPaddle: (newPos: Position) => void;
    onScore: (newScore: Score) => void;
    onBall: (ball: Ball) => void;
    onEnd: () => void;
}

export function PingPong(props: Props) {
    

    return (
        <Rules
            userPaddle={props.userPaddle}
            opponentPaddle={props.opponentPaddle}
            onUserPaddle={props.onUserPaddle}
            onOpponentPaddle={props.onOpponentPaddle}
            config={props.config}
            ball={props.ball}
            room={props.room}
            onEnd={props.onEnd}
            score={props.score}
            opponent={props.opponent}
            user={props.user}
            onScore={props.onScore}
            onBall={props.onBall}
        />
    );
}
