import { PropsWithChildren, useEffect, useState } from "react";
import { END_GAME, GameStatus, START_GAME, Score } from "../../../@types";
import { useSocket } from "../../../hooks";
interface Props {
    room: string;
    onEnd: () => void;
    score: Score;
    username: string;
}

export function Rules(props: PropsWithChildren<Props>) {
    const [gameStatus, setGameStatus] = useState<GameStatus>(START_GAME);
    const [gamStatus, setGamStatus] = useState<boolean>(false);
    const [socket] = useSocket();

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
            setGameStatus(END_GAME);
        }
        setGamStatus((prev: boolean) => !prev);
    }, [props.score]);

    if (gameStatus === END_GAME) {
        return <EndScreen score={props.score} />;
    }

    return (
        <div style={{ position: "relative", width: "400px" }}>
            <button
                style={{
                    width: "auto",
                    position: "absolute",
                    top: "10px",
                    left: "50px",
                }}
                onClick={() =>
                    socket.emit("game-score", {
                        score: {
                            player1: props.score.player1 + 1,
                            player2: props.score.player2,
                        },
                        room: props.room,
                    })
                }
            >
                add player1
            </button>
            <button
                style={{
                    width: "auto",
                    position: "absolute",
                    top: "30px",
                    left: "50px",
                }}
                onClick={() =>
                    socket.emit("game-score", {
                        score: {
                            player1: props.score.player1,
                            player2: props.score.player2 + 1,
                        },
                        room: props.room,
                    })
                }
            >
                add player2
            </button>
            <div
                style={{
                    width: "100px",
                    position: "absolute",
                    top: "30px",
                    left: "300px",
                    backgroundColor: "orange",
                    color: "grey",
                }}
            >
                Score: [{props.score.player1}] - [{props.score.player2}]
            </div>
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
