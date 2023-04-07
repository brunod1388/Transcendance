import { Rules } from "./Rules";
import { Board } from "./Board";
import { BallComponent } from "./Ball";
import { MyPaddle, YourPaddle } from "./Paddle";
import { Ball, GameConfig, PlayerInfo, Position, Score } from "../../../@types";
import { CSSProperties } from "react";
interface Props {
    host: boolean;
    room: string;
    config: GameConfig;
    user: PlayerInfo;
    opponent: PlayerInfo;
    ball: Ball;
    score: Score;
    paddle1: Position;
    paddle2: Position;
    onPaddle1: (pos: Position) => void;
    onPaddle2: (pos: Position) => void;
    onOpponentPaddle: (newPos: Position) => void;
    onScore: (newScore: Score) => void;
    onBall: (ball: Ball) => void;
    onEnd: () => void;
}

export function PingPong(props: Props) {
    const empty: CSSProperties = {};

    return (
        <Rules
            paddle1={props.paddle1}
            paddle2={props.paddle2}
            config={props.config}
            ball={props.ball}
            room={props.room}
            onEnd={props.onEnd}
            score={props.score}
            opponnent={props.opponent}
            user={props.user}
            onPaddle1={props.onPaddle1}
            onPaddle2={props.onPaddle2}
            onOpponentPaddle={props.onOpponentPaddle}
            onScore={props.onScore}
            onBall={props.onBall}
        >
            <Board score={props.score} config={props.config}>
                <BallComponent
                    ball={props.ball}
                    config={props.config}
                    skin={empty}
                />
                <MyPaddle
                    onPaddle={props.host ? props.onPaddle1 : props.onPaddle2}
                    room={props.room}
                    host={props.user.host}
                    paddle={props.user.host ? props.paddle1 : props.paddle2}
                    skin={empty}
                    config={props.config}
                />
                <YourPaddle
                    onPaddle={() =>
                        props.host ? props.paddle2 : props.paddle1
                    }
                    room={props.room}
                    host={props.opponent.host}
                    paddle={props.user.host ? props.paddle2 : props.paddle1}
                    skin={empty}
                    config={props.config}
                />
            </Board>
        </Rules>
    );
}
