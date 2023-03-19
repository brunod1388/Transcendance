import { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { useSocket } from "..";
import { GameInfo } from "../../@types";
import { useAuth } from "../../context";
import { leaveGame } from "../../utils/pong.utils";

export function useLoadGame(
    room: string,
    navigate: NavigateFunction,
	onEnd: () => void
): [string, boolean, boolean] {
    const [socket] = useSocket();
    const [host, setHost] = useState(false);
    const [opponent, setOpponent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.emit("game-join", room);
    }, [socket, room]);

    useEffect(() => {
        socket.on("game-info", (info: GameInfo) => {
            console.log("ready");
            console.log(`username ${userAuth.username}`);
            console.log(info.player1);
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
				onEnd();
                leaveGame(socket, room, navigate);
            },
            { once: true }
        );
    }, [navigate, room, socket]);

    return [opponent, host, isLoading];
}
