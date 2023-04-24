import { useSocket } from "../../hooks";
import { CONNECTED, DISCONECTED, GameConfig, GameMode, PlayerInfo } from "@customTypes";
import { useEffect, PropsWithChildren, useState } from "react";
import { LoadGame } from "./LoadGame";
import { Score } from "@customTypes";
import { useAuth } from "context";

interface Props {
    host: boolean;
    room: string;
    user: PlayerInfo;
    config: GameConfig;
    opponent: PlayerInfo;
    score: Score;
    onEnd: () => void;
    onUser: (player: PlayerInfo) => void;
    onOpponent: (player: PlayerInfo) => void;
    onMode: (newMode: GameMode) => void;
    mode: GameMode;
}

interface PlayersInfoDTO {
    id: number;
    username: string;
}

export function GameEvent(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const { userAuth } = useAuth();

    // Get informations about the opponent
    useEffect(() => {
        const obtainPlayersInfo = () => {
            socket.emit("obtain-opponent-info", props.room);
            props.onUser({
                status: CONNECTED,
                username: userAuth.username,
                id: userAuth.id,
                host: props.host,
            });
        };

        obtainPlayersInfo();
    }, []);

    // Each time the user is modified send the updated informations to the opponent
    useEffect(() => {
        socket.emit("player", { player: props.user, room: props.config.room, id: props.user.id });
    }, [props.user]);

    // Update informations received by socket
    useEffect(() => {
        socket.on("set-opponent-info", (playersInfoDto: PlayersInfoDTO) => {
            props.onOpponent({
                status: CONNECTED,
                username: playersInfoDto.username,
                id: playersInfoDto.id,
                host: !props.host,
            });
        });

        socket.on("game-mode", (gameMode: GameMode) => {
            if (props.host === false) {
                props.onMode(gameMode);
            }
        });

        socket.on("player", (player: PlayerInfo) => {
            props.onOpponent(player);
        });

        return () => {
            socket.off("player");
            socket.off("set-opponent-info");
            socket.off("game-mode");
        };
    }, [socket, props.host]);

    // Event handler trigger if the player go back to the previous page
    useEffect(() => {
        const listener = (e: PopStateEvent) => {
            if (props.user.host === true && gameStarted === true) {
                socket.emit("newMatch", {
                    user1id: props.user.id,
                    user2id: props.opponent.id,
                    winner: props.opponent.id,
                    score1: props.score.player1,
                    score2: props.score.player2,
                    type: "Training",
                });
            }
            socket.emit("game-player-left", props.config.room);
            props.onEnd();
        };

        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, [gameStarted, props.score]);

    // If the opponent quit the game end it
    useEffect(() => {
        let timer: NodeJS.Timeout;

        socket.on("game-player-left", () => {
            props.onOpponent({ ...props.opponent, status: DISCONECTED });
            if (props.user.host === true && gameStarted === true) {
                socket.emit("newMatch", {
                    user1id: props.user.id,
                    user2id: props.opponent.id,
                    winner: props.user.id,
                    score1: props.score.player1,
                    score2: props.score.player2,
                    type: "Training",
                });
            }
            timer = setTimeout(props.onEnd, 5000);
        });

        return () => {
            clearTimeout(timer);
            socket.off("game-player-left");
        };
    }, [socket, gameStarted, props.score]);

    // If the opponent logout and was the host record the game in database
    useEffect(() => {
        socket.on("game-player-logout", () => {
            if (props.user.host === false && gameStarted === true) {
                socket.emit("newMatch", {
                    user1id: props.opponent.id,
                    user2id: props.user.id,
                    winner: props.user.id,
                    score1: props.score.player1,
                    score2: props.score.player2,
                    type: "Training",
                });
            }
        });

        return () => {
            socket.off("game-player-logout");
        };
    }, [socket, gameStarted, props.score]);

    // Until the game isn't started display the Loading/Waiting page
    return (
        <LoadGame
            room={props.room}
            onMode={props.onMode}
            gameStarted={gameStarted}
            onGameStarted={(status: boolean) => setGameStarted(status)}
            score={props.score}
            user={props.user}
            config={props.config}
            opponent={props.opponent}
            onUser={props.onUser}
            mode={props.mode}
        >
            {props.children}
        </LoadGame>
    );
}
