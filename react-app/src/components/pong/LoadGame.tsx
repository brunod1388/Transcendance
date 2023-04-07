import { CONNECTED, DISCONECTED, GameConfig, PlayerInfo, READY, Score } from "../../@types";
import { PropsWithChildren, useEffect, useState } from "react";
import { playersAreReady } from "./GameService";
import { EndScreen } from "./Classic/Rules";

interface Props {
	gameStarted:boolean;
	onGameStarted: (status: boolean) => void;
    user: PlayerInfo;
    config: GameConfig;
    opponent: PlayerInfo;
	score: Score;
    onUser: (player: PlayerInfo) => void;
}

export function LoadGame(props: PropsWithChildren<Props>) {
    const status = props.user.status !== READY ? READY : CONNECTED;
	useEffect(() => {
		if (props.gameStarted === false && playersAreReady(props.user, props.opponent) === true) {
			props.onGameStarted(true);
		}
	}, [props.user, props.opponent, props.gameStarted]);

    if (props.gameStarted === true && props.opponent.status !== DISCONECTED) {
        return <>{props.children}</>;
    }
	else if (props.gameStarted === true && props.opponent.status === DISCONECTED) {
		return <EndScreen user={props.user} opponent={props.opponent} score={props.score}/>
    }
    return (
			<div>
            Waiting...
            <div>
                <button onClick={() => props.onUser({ ...props.user, status })}>
                    {props.user.status}
                </button>
            </div>
        </div>
    );
}
