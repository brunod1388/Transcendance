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
    DISCONECTED,
    PositionPingPongPaddle,
} from "../../../@types";
import { useSocket, useTimeout } from "../../../hooks";
import { useInterval } from "../../../hooks";
import { move, detectScore, launchBall } from "./Physics";
import style from "./pong.module.scss";
interface Props {
    yourMovement: Position;
    myMovement: Position;
    ball: Ball;
    userPaddle: Paddle;
    opponentPaddle: Paddle;
    config: GameConfig;
    room: string;
    onEnd: () => void;
    onUserPaddle: (pos: Position) => void;
    onOpponentPaddle: (pos: Position) => void;
    onScore: (newScore: Score) => void;
    onBall: (ball: Ball) => void;
    score: Score;
    user: PlayerInfo;
    opponent: PlayerInfo;
    onYourMovement: (newMove: Position) => void;
}

export function Rules(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();
    const [gameStatus, setGameStatus] = useState<GameStatus>(
        GameStatus.LAUNCH_BALL
    );
    const [update, setUpdate] = useState<boolean>(false);
    const onGameStatus = (status: GameStatus) => setGameStatus(status);
    const [lastHit, setLastHit] = useState<number>(0);

    const onLastHit = (posY: number) => {
        setLastHit(posY);
    };

    function startGame() {
        if (gameStatus === GameStatus.LAUNCH_BALL) {
            launchBall(props.ball, props.onBall, onGameStatus);
        } else if (gameStatus === GameStatus.MOVE_BALL) {
            if (detectScore(props.ball, props.config)) {
                let newScore: Score = {
                    player1: props.score.player1,
                    player2: props.score.player2,
                };
                if (props.ball.pos.x < props.config.boardWidth / 2) {
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
                onLastHit(0);
                socket.emit("game-score", {
                    room: props.room,
                    score: newScore,
                });
                props.onScore(newScore);
                onGameStatus(GameStatus.LAUNCH_BALL);
            } else {
                move(
                    props.ball,
                    props.onBall,
                    props.userPaddle,
                    props.opponentPaddle,
                    props.config,
                    props.myMovement,
                    props.yourMovement,
                    lastHit,
                    onLastHit
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
            socket.emit("game-ball", { data: props.ball, room: props.room });
        }
        setUpdate(false);
    }, [update]);

    useEffect(() => {
        socket.on("game-score", (newScore: Score) => {
            props.onScore(newScore);
            props.onUserPaddle(props.config.initialPaddle1);
            props.onOpponentPaddle(props.config.initialPaddle2);
        });

        socket.on("game-ball", (ball: Ball) => {
            if (props.user.host === false) {
                props.onBall({
                    ...ball,
                    pos: {
                        x: props.config.boardWidth - ball.pos.x,
                        y: props.config.boardHeight - ball.pos.y,
                    },
                });
            }
        });

        socket.on("game-paddle", (data: PositionPingPongPaddle) => {
            if (data.movement !== undefined) {
                props.onYourMovement(data.movement);
            }
            props.onOpponentPaddle({
                x:
                    props.config.boardWidth -
                    data.pos.x +
                    (props.user.host ? 0 : -props.config.paddleWidth),
                y:
                    props.config.boardHeight -
                    data.pos.y +
                    props.config.paddleHeight,
            });
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
        if (props.score.player1 >= 10 || props.score.player2 >= 10) {
            if (props.user.host === true) {
				socket.emit("newMatch", {
					user1id: props.user.id,
					user2id: props.opponent.id,
					winner: (props.score.player1 >= 10) ?  props.user.id : props.opponent.id,
					score1: props.score.player1,
					score2: props.score.player2,
					type: "Training"
				});
            }
            setGameStatus(END_GAME);
        }
    }, [props.score]);

    if (gameStatus === END_GAME || props.opponent.status === DISCONECTED) {
        return (
            <EndScreen
                opponent={props.opponent}
                user={props.user}
                score={props.score}
            />
        );
    }

    return (
        <div style={{ position: "relative", width: "400px" }}>
            {props.children}
        </div>
    );
}

interface PropsEnd {
    score: Score;
    opponent: PlayerInfo;
    user: PlayerInfo;
}

export function EndScreen(props: PropsEnd) {
    if (
        props.opponent.status === DISCONECTED ||
        (props.user.host === true && props.score.player1 >= 10) ||
        (props.user.host === false && props.score.player2 >= 10)
    ) {
        return (
            <div className={style.endScreen}>
                <div className={style.wrapper}>
                    <div className={style.win}>You Win!</div>
                    <p className={style.finalScore}>
                        {props.user.host
                            ? props.score.player1
                            : props.score.player2}
                        -
                        {props.user.host
                            ? props.score.player2
                            : props.score.player1}
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className={style.endScreen}>
            <div className={style.wrapper}>
                <div className={style.lost}>You Lost...</div>
                <p className={style.finalScore}>
                    {props.user.host
                        ? props.score.player1
                        : props.score.player2}
                    -
                    {props.user.host
                        ? props.score.player2
                        : props.score.player1}
                </p>
            </div>
        </div>
    );
}
