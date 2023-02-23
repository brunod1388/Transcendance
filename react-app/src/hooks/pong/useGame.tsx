import { useState, useEffect } from "react";
import { Score, PLAYING, LEFT, WIN } from "../../@types";
import { useSocket } from "..";
import { changeScore } from "../../utils/pong.utils";
import { Broadcast } from "../../@types";
import { NavigateFunction } from "react-router-dom";

export function useGame(
    room: string,
    host: boolean,
    navigate: NavigateFunction
): [number, Score, (side: string) => void] {
    const [score, setScore] = useState<Score>(new Score(0, 0));
    const [statut, setStatut] = useState<number>(PLAYING);
    const [socket] = useSocket();

    // A player scored.
    const onScore = (side: string) => {
        setScore((prev: Score) => changeScore(side, prev));
    };

    // A player has won.
    useEffect(() => {
        if (score.player1 >= 10 || score.player2 >= 10) setStatut(WIN);
    }, [score]);

    // Send the new score.
    useEffect(() => {
        if (host === true && (score.player1 !== 0 || score.player2 !== 0)) {
            socket.emit(
                "game-broadcast",
                new Broadcast(room, "game-score", score)
            );
        }
    }, [host, score, socket, room]);

    // Receive events broadcast on the channel
    useEffect(() => {
        socket.on("game-score", (newScore: Score) => {
            setScore(newScore);
        });
        socket.on("game-player-left", (user: string) => {
            setStatut(LEFT);
        });
        return () => {
            socket.off("game-score");
            socket.off("game-player-left");
        };
    }, [socket]);

    useEffect(() => {
        if (host === true && statut !== PLAYING) {
            socket.emit("game-end", {
                room: room,
                score: score,
                reason: statut,
            });
        }
    }, [socket, host, statut, room, score]);

    useEffect(() => {
        if (statut !== PLAYING) {
            const timer = setTimeout(() => {
                navigate("/home");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [socket, host, statut, room, score, navigate]);

    return [statut, score, onScore];
}
