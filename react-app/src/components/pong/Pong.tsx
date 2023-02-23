import { CSSProperties } from "react";
import { leaveGame } from "../../utils/pong.utils";
import { useNavigate } from "react-router-dom";
import {
    Score,
    Position,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PLAYING,
    BALL_RADIUS,
} from "../../@types";
import { useSocket, useQuery, useTimeout } from "../../hooks";
import {
    useMyPaddle,
    useYourPaddle,
    useBall,
    useGame,
    useLoadGame,
} from "../../hooks/pong";
import style from "./pong.module.scss";

interface PropsGame {
    room: string;
    host: boolean;
    opponent: string;
}

interface PropsPong {
    room: string;
    host: boolean;
    score: Score;
    onScore: (side: string) => void;
}

export function Pong() {
    const room = useQuery("room"); // room id
    const [socket] = useSocket();
    const navigate = useNavigate();
    const [opponent, host, isLoading] = useLoadGame(room, navigate);

    useTimeout(() => {
        if (isLoading) {
            leaveGame(socket, room, navigate);
        }
    }, 5000);

    if (isLoading) {
        return <div>Loading</div>;
    }
    return <Game room={room} host={host} opponent={opponent} />;
}

function Game({ room, host, opponent }: PropsGame) {
    const navigate = useNavigate();
    const [statut, score, onScore] = useGame(room, host, navigate);

    if (statut === PLAYING) {
        return (
            <Board host={host} room={room} score={score} onScore={onScore} />
        );
    }
    return <div>GAME ENDED</div>;
}

function Board({ host, room, onScore, score }: PropsPong) {
    const paddle1 = useYourPaddle(host, score);
    const paddle2 = useMyPaddle(host, room, score);
    const ball = useBall(host, room, paddle1, paddle2, onScore, score);

    return (
        <div className={style.container} tabIndex={-1}>
            <GameScore {...{ ...score }} />
            <Paddle x={paddle1.x} y={paddle1.y} />
            <Paddle x={paddle2.x} y={paddle2.y} />
            <Ball x={ball.x} y={ball.y} />
        </div>
    );
}

function GameScore(score: Score) {
    return (
        <>
            <div style={{ color: "white" }}>{score.player1}</div>
            <div style={{ color: "white" }}>{score.player2}</div>
        </>
    );
}

function Paddle(paddle: Position) {
    const position: CSSProperties = {
        left: paddle.x - PADDLE_WIDTH,
        bottom: paddle.y - PADDLE_HEIGHT,
    };
    return <div style={position} className={style.paddle}></div>;
}

function Ball(ball: Position) {
    const position: CSSProperties = {
        left: ball.x - BALL_RADIUS,
        bottom: ball.y - BALL_RADIUS,
    };

    return <div style={position} className={style.ball}></div>;
}
