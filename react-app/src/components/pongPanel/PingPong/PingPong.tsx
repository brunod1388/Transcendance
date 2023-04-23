import { Board } from "./Board";
import { BallComponent } from "../components/Ball";
import { MyPaddle, YourPaddle } from "./Paddle";
import { Ball, GameConfig, PlayerInfo, Position, Score } from "@customTypes";
import { CSSProperties, useEffect, useState, PropsWithChildren } from "react";
import {
    END_GAME,
    GameStatus,
    DISCONECTED,
    PositionPingPongPaddle,
    WIN_SCORE,
    END_MESSAGE_TIMEOUT,
} from "@customTypes";
import { useSocket, useInterval } from "hooks";
import { move, detectScore } from "./Physics";
import { EndScreen } from "../components/EndScreen";
import "../styles/endScreen.scss";

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

export function PingPong(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.LAUNCH_BALL);
    const [update, setUpdate] = useState<boolean>(false);
    const onGameStatus = (status: GameStatus) => setGameStatus(status);
    const [lastHit, setLastHit] = useState<number>(0);
    const [hidden, setHidden] = useState<boolean>(false);

    const empty: CSSProperties = {};
    const [myMovement, setMyMovement] = useState<Position>({ x: 0, y: 0 });
    const [yourMovement, setYourMovement] = useState<Position>({ x: 0, y: 0 });

    // Set ball position at the beginning of the game
    useEffect(() => {
        props.onBall({
            ...props.ball,
            pos: { x: props.config.boardWidth / 2, y: 50 },
        });
    }, []);

    // Check if the user already hit the ball on his side
    const onLastHit = (posY: number) => {
        setLastHit(posY);
    };

    // Main loop of the game (run every 10ms)
    useInterval(() => {
        if (gameStatus !== END_GAME && hidden === false) {
            setUpdate(true);
        }
    }, 10);

    useEffect(() => {
        if (props.user.host) {
            startGame();
            socket.emit("game-ball", { data: props.ball, room: props.room });
        }
        setUpdate(false);
    }, [update]);

    function startGame() {
        if (gameStatus === GameStatus.LAUNCH_BALL) {
            onLastHit(0);
            onGameStatus(GameStatus.MOVE_BALL);
        } else if (gameStatus === GameStatus.MOVE_BALL) {
            if (detectScore(props.ball, props.config)) {
                let newScore: Score = {
                    player1: props.score.player1,
                    player2: props.score.player2,
                };
                if (props.ball.pos.y < props.config.boardHeight / 2) {
                    newScore.player2 += 1;
                } else {
                    newScore.player1 += 1;
                }
                props.onBall({
                    pos: {
                        x: props.config.boardWidth / 2,
                        y:
                            props.ball.pos.x < props.config.boardWidth / 2
                                ? 50
                                : props.config.boardHeight - 50,
                    },
                    delta: { x: 0, y: 0 },
                    speed: 0.7,
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
                    myMovement,
                    yourMovement,
                    lastHit,
                    onLastHit
                );
            }
        }
    }

    // handle sleeping tabs
    useEffect(() => {
        setHidden(document.hidden);
    }, [document.hidden]);

    // socket events
    useEffect(() => {
        socket.on("game-score", (newScore: Score) => {
            props.onScore(newScore);
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
                setYourMovement(data.movement);
            }
            props.onOpponentPaddle({
                x:
                    props.config.boardWidth -
                    data.pos.x +
                    (props.user.host ? 0 : -props.config.paddleWidth),
                y: props.config.boardHeight - data.pos.y + props.config.paddleHeight,
            });
        });
        return () => {
            socket.off("game-score");
            socket.off("game-paddle");
            socket.off("game-ball");
        };
    }, []);

    // Trigger the end of the game if the win score is reached
    useEffect(() => {
        if (props.score.player1 >= WIN_SCORE || props.score.player2 >= WIN_SCORE) {
            if (props.user.host === true) {
                socket.emit("newMatch", {
                    user1id: props.user.id,
                    user2id: props.opponent.id,
                    winner: props.score.player1 >= WIN_SCORE ? props.user.id : props.opponent.id,
                    score1: props.score.player1,
                    score2: props.score.player2,
                    type: "Training",
                });
            }
            setGameStatus(END_GAME);
        }
    }, [props.score]);

    // Start a count down before coming back to the home page
    // In the meantime the endscreen is displayed
    useEffect(() => {
        if (gameStatus === END_GAME) {
            const timer = setTimeout(() => {
                props.onEnd();
            }, END_MESSAGE_TIMEOUT);

            return () => clearTimeout(timer);
        }
    }, [gameStatus]);

    // Display End screen
    if (gameStatus === END_GAME || props.opponent.status === DISCONECTED) {
        return <EndScreen opponent={props.opponent} user={props.user} score={props.score} />;
    }

    // Display Pong Game
    return (
        <div className="play-board-container">
            <Board user={props.user} score={props.score} config={props.config}>
                <BallComponent ball={props.ball} config={props.config} skin={empty} />
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
        </div>
    );
}
