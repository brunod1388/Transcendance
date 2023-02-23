import { Score, Broadcast } from "../@types/pong.types";
import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";

export function changeScore(side: string, prev: Score): Score {
    let newScore = new Score(prev.player1, prev.player2);
    if (side === "left") {
        newScore.player2 += 1;
    } else if (side === "right") {
        newScore.player1 += 1;
    }
    return newScore;
}

export function leaveGame(
    socket: Socket,
    room: string,
    navigate: NavigateFunction
) {
    socket.emit(
        "game-broadcast",
        new Broadcast(room, "game-player-left", socket.id)
    );
    socket.emit("leave", room);
    navigate("/home");
}
