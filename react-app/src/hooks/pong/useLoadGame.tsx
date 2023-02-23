import { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { useSocket } from "..";
import { GameInfo } from "../../@types";
import { leaveGame } from "../../utils/pong.utils";

export function useLoadGame(
    room: string,
    navigate: NavigateFunction
): [string, boolean, boolean] {
    const [socket] = useSocket();
    const [host, setHost] = useState(false);
    const [opponent, setOpponent] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        socket.emit("game-join", room);
    }, [socket, room]);

    useEffect(() => {
        socket.on("game-info", (info: GameInfo) => {
            let host = info.player1 === socket.id ? true : false;
            let opponent = host ? info.player2 : info.player1;
            setHost(host);
            setOpponent(opponent);
            setIsLoading(false);
        });

        return () => {
            socket.off("game-info");
        };
    }, [socket, room]);

    // Send an event when the user press the back button
    useEffect(() => {
        window.addEventListener(
            "popstate",
            (e: PopStateEvent) => {
                leaveGame(socket, room, navigate);
            },
            { once: true }
        );
    }, [navigate, room, socket]);

    return [opponent, host, isLoading];
}
