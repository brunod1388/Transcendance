import { Rules } from "./Rules";
import { Board } from "./Board";
import { Ball } from "./Ball";
import { MyPaddle, YourPaddle } from "./Paddle";
import { GameConfig, PlayerInfo, Position, Score } from "../../../@types";
import { CSSProperties } from "react";
interface Props {
    room: string;
    config: GameConfig;
    user: PlayerInfo;
    opponent: PlayerInfo;
    ball: Position;
    score: Score;
    userPaddle: Position;
    opponnentPaddle: Position;
    onEnd: () => void;
}

export function PongClassic(props: Props) {
    const empty: CSSProperties = {};

    return (
        <Rules
            username={props.user.username}
            room={props.room}
            onEnd={props.onEnd}
            score={props.score}
        >
            {/* <Board> */}
            PONG
            {/* <Ball host={props.user.host} ball={props.ball} skin={empty} rayon={props.config.ballRayon}/> */}
            {/* <MyPaddle host={props.user.host} paddle={props.userPaddle} skin={empty} width={props.config.paddleWidth} height={props.config.paddleHeight}/> */}
            {/* <YourPaddle host={props.opponent.host} paddle={props.userPaddle} skin={empty} width={props.config.paddleWidth} height={props.config.paddleHeight}/> */}
            {/* </Board> */}
        </Rules>
    );
}
