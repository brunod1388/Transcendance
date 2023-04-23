import { Board } from "./Board";
import { BallComponent } from "../components/Ball";
import { MyPaddle, YourPaddle } from "./Paddle";
import {
    Ball,
    GameConfig,
    PlayerInfo,
    Position,
    Score,
    DISCONECTED,
    WIN_SCORE,
    END_GAME,
    GameStatus,
    END_MESSAGE_TIMEOUT,
    Paddle,
} from "@customTypes";
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { useSocket, useInterval } from "hooks";
import { move, detectScore, launchBall } from "./Physics";
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
    paddle1: Position;
    paddle2: Position;
    onPaddle1: (pos: Position) => void;
    onPaddle2: (pos: Position) => void;
    onOpponentPaddle: (newPos: Position) => void;
    onScore: (newScore: Score) => void;
    onBall: (ball: Ball) => void;
    onEnd: () => void;
}

export type MatchType = "Training" | "Ranked";
interface CreateMatchDTO {
    user1id: number;
    user2id: number;
    score1: number;
    score2: number;
    winner: number;
    type: MatchType;
}

export function PongClassic(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();
	const empty: CSSProperties = {};
    const [update, setUpdate] = useState<boolean>(false);
    const [launch, setLaunch] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(false);
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.BEGIN);
	const onGameStatus = (status: GameStatus) => setGameStatus(status);

	// Launch the ball for the first time
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameStatus === GameStatus.BEGIN) {
            timer = setTimeout(() => {
                launchBall(props.onBall, onGameStatus, props.config);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, []);

	// Launch the ball in a random direction
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (launch === true) {
            timer = setTimeout(() => {
                if (gameStatus !== END_GAME) {
                    launchBall(props.onBall, onGameStatus, props.config);
                }
                setLaunch(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [launch]);

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
            setLaunch(true);
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
                socket.emit("game-score", {
                    room: props.room,
                    score: newScore,
                });
                props.onScore(newScore);
                onGameStatus(GameStatus.LAUNCH_BALL);
            } else {
                move(props.ball, props.onBall, props.paddle1, props.paddle2, props.config);
            }
        }
    }

    useEffect(() => {
        setHidden(document.hidden);
    }, [document.hidden]);


   

    useEffect(() => {
        socket.on("game-score", (newScore: Score) => {
            props.onScore(newScore);
            props.onPaddle1(props.config.initialPaddle1);
            props.onPaddle2(props.config.initialPaddle2);
        });

        socket.on("game-ball", (ball: Ball) => {
            if (props.user.host === false) {
                props.onBall(ball);
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
        if (props.score.player1 >= WIN_SCORE || props.score.player2 >= WIN_SCORE) {
            if (props.user.host === true && gameStatus !== END_GAME) {
                console.log("record on score");
                const dto: CreateMatchDTO = {
                    user1id: props.user.id,
                    user2id: props.opponent.id,
                    winner: props.score.player1 >= WIN_SCORE ? props.user.id : props.opponent.id,
                    score1: props.score.player1,
                    score2: props.score.player2,
                    type: "Training",
                };
                socket.emit("newMatch", dto);
            }
            setGameStatus(END_GAME);
        }
    }, [props.score]);

	useEffect(() => {
        if (gameStatus === END_GAME) {
            const timer = setTimeout(() => {
                props.onEnd();
            }, END_MESSAGE_TIMEOUT);

            return () => clearTimeout(timer);
        }
    }, [gameStatus]);

    if (gameStatus === END_GAME || props.opponent.status === DISCONECTED) {
        return <EndScreen opponent={props.opponent} user={props.user} score={props.score} />;
    }

    return (
        <div className="play-board-container">
            <Board score={props.score} config={props.config}>
                <BallComponent ball={props.ball} config={props.config} skin={empty} />
                <MyPaddle
                    onPaddle={props.user.host ? props.onPaddle1 : props.onPaddle2}
                    room={props.room}
                    host={props.user.host}
                    paddle={props.user.host ? props.paddle1 : props.paddle2}
                    skin={empty}
                    config={props.config}
                />
                <YourPaddle
                    onPaddle={() => (props.user.host ? props.paddle2 : props.paddle1)}
                    room={props.room}
                    host={props.opponent.host}
                    paddle={props.user.host ? props.paddle2 : props.paddle1}
                    skin={empty}
                    config={props.config}
                />
            </Board>
        </div>
    );
}
