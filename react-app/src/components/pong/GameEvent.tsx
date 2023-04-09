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
import { useAuth } from "../../context";

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
}

interface PlayersInfoDTO {
	id: number;
	username: string;
}




export function GameEvent(props: PropsWithChildren<Props>) {
    const [socket] = useSocket();
    const [gameStarted, setGameStarted] = useState<boolean>(false);
	const {userAuth} = useAuth();

	const obtainPlayersInfo = () => {
		socket.emit('obtain-opponent-info', props.room);
		props.onUser({status: CONNECTED, username: userAuth.username, id: userAuth.id,  host: props.host});
	}

	useEffect(() => {
		socket.on("set-opponent-info", (playersInfoDto: PlayersInfoDTO) =>  {
			console.log(`user-info:\n\tid: ${playersInfoDto.id}\n\tusername: ${playersInfoDto.username}`);
			props.onOpponent({status: CONNECTED, username: playersInfoDto.username, id: playersInfoDto.id,  host: !props.host});
		});
		return () => {socket.off("set-opponent-info")};
	});

    useEffect(() => {
		obtainPlayersInfo();
        window.addEventListener(
            "popstate",
            (e: PopStateEvent) => {
                if (props.user.host === true && gameStarted === true) {
					console.log("record on leave");
                    socket.emit("newMatch", {
						user1id: props.user.id,
						user2id: props.opponent.id,
						winner: props.opponent.id,
						score1: props.score.player1,
						score2: props.score.player2,
						type: "Training"
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
				console.log("record on opponent leave");
                    socket.emit("newMatch", {
						user1id: props.user.id,
						user2id: props.opponent.id,
						winner: props.user.id,
						score1: props.score.player1,
						score2: props.score.player2,
						type: "Training"
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
