import {
    CLASSIC,
    CONNECTED,
    DISCONECTED,
    GameConfig,
    GameMode,
    PINGPONG,
    PlayerInfo,
    READY,
    Score,
} from "@customTypes";
import { PropsWithChildren, useEffect, useState } from "react";
import { playersAreReady } from "./GameService";
import { EndScreen } from "./Classic/Rules";
import { useSocket } from "hooks";

interface Props {
    gameStarted: boolean;
    onGameStarted: (status: boolean) => void;
    user: PlayerInfo;
    config: GameConfig;
    opponent: PlayerInfo;
    score: Score;
    onUser: (player: PlayerInfo) => void;
    onMode: (newMode: GameMode) => void;
    mode: GameMode;
    room: string;
}

export function LoadGame(props: PropsWithChildren<Props>) {
    const status = props.user.status !== READY ? READY : CONNECTED;
    const [socket] = useSocket();
    useEffect(() => {
        if (
            props.gameStarted === false &&
            playersAreReady(props.user, props.opponent) === true
        ) {
            props.onGameStarted(true);
        }
    }, [props.user, props.opponent, props.gameStarted]);

    if (props.gameStarted === true && props.opponent.status !== DISCONECTED) {
        return <>{props.children}</>;
    } else if (
        props.gameStarted === true &&
        props.opponent.status === DISCONECTED
    ) {
        return (
            <EndScreen
                user={props.user}
                opponent={props.opponent}
                score={props.score}
            />
        );
    }

    const handleChange = (e: any) => {
        socket.emit("game-mode", { mode: e.target.value, room: props.room });
        props.onMode(e.target.value);
    };

    return (
        <div>
            Waiting...
            <div>
                <button onClick={() => props.onUser({ ...props.user, status })}>
                    {props.user.status}
                </button>
                {props.user.host && (
                    <select value={props.mode} onChange={handleChange}>
                        <option value={CLASSIC}>Classic</option>
                        <option value={PINGPONG}>Ping Pong</option>
                    </select>
                )}
                {props.user.host === false && <div>{props.mode}</div>}
            </div>
        </div>
    );
}
