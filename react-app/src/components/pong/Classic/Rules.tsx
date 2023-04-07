import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
    Ball,
    END_GAME,
    GameStatus,
    LOST,
    PlayerInfo,
    Score,
    WON,
    Paddle,
    GameConfig,
    Position,
} from "../../../@types";
import { useSocket, useTimeout } from "../../../hooks";
import { useInterval } from "../../../hooks";
import { move, detectScore, launchBall } from "./Physics";
interface Props {
    ball: Ball;
    paddle1: Paddle;
    paddle2: Paddle;
    config: GameConfig;
    room: string;
    onEnd: () => void;
    onPaddle1: (pos: Position) => void;
    onPaddle2: (pos: Position) => void;
    onOpponentPaddle: (newPos: Position) => void;
    onScore: (newScore: Score) => void;
    onBall: (ball: Ball) => void;
    score: Score;
    user: PlayerInfo;
    opponnent: PlayerInfo;
}

export function Rules(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();
    const [gameStatus, setGameStatus] = useState<GameStatus>(
        GameStatus.LAUNCH_BALL
    );
    const [update, setUpdate] = useState<boolean>(false);
    const onGameStatus = (status: GameStatus) => setGameStatus(status);

    function startGame() {
        if (gameStatus === GameStatus.LAUNCH_BALL) {
            launchBall(props.ball, props.onBall, onGameStatus);
        } else if (gameStatus === GameStatus.MOVE_BALL) {
            if (detectScore(props.ball, props.config)) {
                let newScore: Score = {
                    player1: props.score.player1,
                    player2: props.score.player2,
                };
                if (props.ball.pos.x > props.config.boardWidth / 2) {
                    newScore.player2 += 1;
                } else {
                    newScore.player1 += 1;
                }
                props.onBall({
                    pos: {
                        x: props.config.boardWidth / 2,
                        y: props.config.boardHeight / 2,
                    },
                    delta: { x: 0, y: 0 },
                    speed: 0,
                });
                props.onScore(newScore);
                onGameStatus(GameStatus.LAUNCH_BALL);
            } else {
                move(
                    props.ball,
                    props.onBall,
                    props.paddle1,
                    props.paddle2,
                    props.config
                );
            }
        }
    }

    useInterval(() => {
        if (gameStatus !== END_GAME) {
            setUpdate(true);
        }
    }, 20);

    useEffect(() => {
        if (props.user.host) {
            startGame();
        }
        setUpdate(false);
    }, [update]);

    useEffect(() => {
        socket.on("game-score", (newScore: Score) => {
            // props.onScore(newScore);
            props.onPaddle1({ x: 10, y: props.config.boardHeight / 2 });
            props.onPaddle2({ x: 200, y: props.config.boardHeight / 2 });
        });

        socket.on("game-ball", (ball: Ball) => {
            if (props.user.host === false) {
                // props.onBall(ball);
            }
        });

        socket.on("game-paddle", (position: Position) => {
            props.onOpponentPaddle(position);
        });
        return () => {
            socket.off("game-score");
            socket.off("game-paddle");
            socket.off("game-ball");
        };
    }, []);

    useEffect(() => {
        if (gameStatus === END_GAME) {
            const timer = setTimeout(() => {
                props.onEnd();
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [gameStatus]);

    useEffect(() => {
        if (props.score.player1 === 10 || props.score.player2 === 10) {
            if (props.user.host === true) {
                // socket.emit("record-game", {
                //     player1: {
                //         username: props.user.username,
                //         score: props.score.player1,
                //         status: props.score.player1 === 10 ? WON : LOST,
                //     },
                //     player2: {
                //         username: props.opponnent.username,
                //         score: props.score.player2,
                //         status: props.score.player2 === 10 ? WON : LOST,
                //     },
                // });
            }
            // setGameStatus(END_GAME);
        }
    }, [props.score]);

    if (gameStatus === END_GAME) {
        return <EndScreen score={props.score} />;
    }

    return (
        <div style={{ position: "relative", width: "400px" }}>
            {props.children}
        </div>
    );
}

interface PropsEnd {
    score: Score;
}

function EndScreen(props: PropsEnd) {
    return (
        <>
            <div>
                {props.score.player1}-{props.score.player2}
            </div>
        </>
    );
}
