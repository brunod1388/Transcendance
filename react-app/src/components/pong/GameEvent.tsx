import { useSocket } from "../../hooks";
import { CONNECTED, DISCONECTED, GameConfig, PlayerInfo } from "../../@types";

import { useEffect, PropsWithChildren } from "react";
import { LoadGame } from "./LoadGame";
import { Position, Score } from "../../@types";

interface Props {
    user: PlayerInfo;
    config: GameConfig;
    opponent: PlayerInfo;
    onEnd: () => void;
    onUser: (player: PlayerInfo) => void;
    onOpponent: (player: PlayerInfo) => void;
    onScore: (newScore: Score) => void;
    onBall: (newPos: Position) => void;
    onOpponentPaddle: (newPos: Position) => void;
}

export function GameEvent(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();

    useEffect(() => {
        props.onUser({ ...props.user, status: CONNECTED });
        window.addEventListener(
            "popstate",
            (e: PopStateEvent) => {
                socket.emit("game-player-left", props.config.room);
                props.onEnd();
            },
            { once: true }
        );
    }, []);

    useEffect(() => {
        socket.emit("player", { player: props.user, room: props.config.room });
    }, [props.user]);

    useEffect(() => {
        socket.on("player", (player: PlayerInfo) => props.onOpponent(player));

        socket.on("game-player-left", () =>
            props.onOpponent({ ...props.opponent, status: DISCONECTED })
        );

        socket.on("game-score", (newScore: Score) => {
            console.log("newScore", newScore);
            props.onScore(newScore);
        });

        socket.on("game-ball", (position: Position) => {
            props.onBall(position);
        });

        socket.on("game-paddle", (position: Position) => {
            props.onOpponentPaddle(position);
        });

        return () => {
            socket.off("game-score");
            socket.off("game-paddle");
            socket.off("game-ball");
            socket.off("game-player-left");
            socket.off("player");
        };
    }, []);

    return (
        <LoadGame
            user={props.user}
            config={props.config}
            opponent={props.opponent}
            onUser={props.onUser}
        >
            {props.children}
        </LoadGame>
    );
}
