import { Rules } from "./Rules";
import { Board } from "./Board";
import { BallComponent } from "./Ball";
import { MyPaddle, YourPaddle } from "./Paddle";
import { Ball, GameConfig, PlayerInfo, Position, Score } from "../../../@types";
import { CSSProperties, useState } from "react";
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
    const empty: CSSProperties = {};
    const [myMovement, setMyMovement] = useState<Position>({ x: 0, y: 0 });
    const [yourMovement, setYourMovement] = useState<Position>({ x: 0, y: 0 });

    return (
        <Rules
            yourMovement={yourMovement}
            myMovement={myMovement}
            onYourMovement={(newMove: Position) => setYourMovement(newMove)}
            userPaddle={props.userPaddle}
            opponentPaddle={props.opponentPaddle}
            onUserPaddle={props.onUserPaddle}
            onOpponentPaddle={props.onOpponentPaddle}
            config={props.config}
            ball={props.ball}
            room={props.room}
            onEnd={props.onEnd}
            score={props.score}
            opponnent={props.opponent}
            user={props.user}
            onScore={props.onScore}
            onBall={props.onBall}
        >
            <Board user={props.user} score={props.score} config={props.config}>
                <BallComponent
                    ball={props.ball}
                    config={props.config}
                    skin={empty}
                />
                <MyPaddle
                    onMyMovement={(newMove: Position) => setMyMovement(newMove)}
                    myMovement={myMovement}
                    onMyPaddle={props.onUserPaddle}
                    room={props.room}
                    host={props.user.host}
                    myPaddle={props.userPaddle}
                    skin={empty}
                    config={props.config}
                />
                <YourPaddle
                    onYourPaddle={props.onOpponentPaddle}
                    room={props.room}
                    host={props.opponent.host}
                    yourPaddle={props.opponentPaddle}
                    skin={empty}
                    config={props.config}
                />
            </Board>
        </Rules>
    );
}
