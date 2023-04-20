import { Broadcast } from "@customTypes/pong.types";
import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";
import { GameMode } from "@customTypes";

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
}

export function joinGame(socket: Socket, room: string, mode: GameMode) {
    console.log("jaingame");
    if (socket !== undefined) {
        socket.emit("join", room);
        socket.emit("game-join", room);
        socket.emit("joinPong", { room, mode });
    }
}
