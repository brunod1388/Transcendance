import { useSocket } from "../../hooks";
import {
    CONNECTED,
    DISCONECTED,
    GameConfig,
    LOST,
    PlayerInfo,
    WON,
} from "../../@types";

import { useEffect, PropsWithChildren } from "react";
import { LoadGame } from "./LoadGame";
import { Score } from "../../@types";

interface Props {
    user: PlayerInfo;
    config: GameConfig;
    opponent: PlayerInfo;
    score: Score;
    onEnd: () => void;
    onUser: (player: PlayerInfo) => void;
    onOpponent: (player: PlayerInfo) => void;
}

export function GameEvent(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();

    useEffect(() => {
        props.onUser({ ...props.user, status: CONNECTED });
        window.addEventListener(
            "popstate",
            (e: PopStateEvent) => {
                if (props.user.host === true) {
                    socket.emit("record-game", {
                        player1: {
                            username: props.user.username,
                            score: props.score.player1,
                            status: LOST,
                        },
                        player2: {
                            username: props.opponent.username,
                            score: props.score.player2,
                            status: WON,
                        },
                    });
                }
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

        socket.on("game-player-left", () => {
            props.onOpponent({ ...props.opponent, status: DISCONECTED });
            if (props.user.host === true) {
                socket.emit("record-game", {
                    player1: {
                        username: props.user.username,
                        score: props.score.player1,
                        status: WON,
                    },
                    player2: {
                        username: props.opponent.username,
                        score: props.score.player2,
                        status: LOST,
                    },
                });
            }
            props.onEnd();
        });

        return () => {
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
