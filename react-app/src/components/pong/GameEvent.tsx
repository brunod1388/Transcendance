import { useSocket, useTimeout } from "../../hooks";
import {
    CONNECTED,
    DISCONECTED,
    GameConfig,
    LOST,
    PlayerInfo,
    WON,
} from "../../@types";

import { useEffect, PropsWithChildren, useState } from "react";
import { LoadGame } from "./LoadGame";
import { Score } from "../../@types";
import { EndScreen } from "./Classic/Rules";

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
	const [gameStarted, setGameStarted] = useState<boolean>(false);

    useEffect(() => {
        props.onUser({ ...props.user, status: CONNECTED });
        window.addEventListener(
            "popstate",
            (e: PopStateEvent) => {
                if (props.user.host === true && gameStarted === true) {
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
		let timer: NodeJS.Timeout;

        socket.on("player", (player: PlayerInfo) => props.onOpponent(player));

        socket.on("game-player-left", () => {
            props.onOpponent({ ...props.opponent, status: DISCONECTED });
            if (props.user.host === true && gameStarted === true) {
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
			timer = setTimeout(props.onEnd, 5000);
        });

        return () => {
			clearTimeout(timer);
            socket.off("game-player-left");
            socket.off("player");
        };
    }, []);

    return (
        <LoadGame
			gameStarted={gameStarted}
			onGameStarted={(status: boolean) => setGameStarted(status)}
		score={props.score}
            user={props.user}
            config={props.config}
            opponent={props.opponent}
            onUser={props.onUser}
        >
            {props.children}
        </LoadGame>
    );
}
