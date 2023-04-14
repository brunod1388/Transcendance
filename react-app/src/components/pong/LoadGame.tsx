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
import "./styles/loadGame.scss"
import "assets/styles/animationStyle.scss";

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

    // const handleChangeOLD = (e: any) => {
    //     socket.emit("game-mode", { mode: e.target.value, room: props.room });
    //     props.onMode(e.target.value);
    // };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = (!e.target.checked ? CLASSIC : PINGPONG);
        socket.emit("game-mode", { mode: value, room: props.room });
        props.onMode(value);
    }

    return (
        <div className="load-game">
            <div className="title">
                <span>
                    Waiting opponent
                </span>
                <div className="container">
                    <div className="dot-carousel"></div>
                </div>
            </div>
                {props.user.host && (
                    <div>
                        {/* <select value={props.mode} onChange={handleChangeOLD}>
                            <option value={CLASSIC}>Classic</option>
                            <option value={PINGPONG}>Ping Pong</option>
                        </select> */}
                        <div className="switch-button">
                            <input
                                className="switch-button-checkbox"
                                type="checkbox"
                                onChange={(e) => handleChange(e)}
                            ></input>
                            <label className="switch-button-label" htmlFor="">
                                <span className="switch-button-label-span">
                                    Classic
                                </span>
                            </label>
                        </div>
                    </div>
                )}
                {props.user.host === false &&
                    <div className="mode">
                        <span>Mode</span> <span>{props.mode}</span>
                    </div>}
                <button
                    className={"button-purple" + (status === READY ? " iamready" : "")}
                    onClick={() => props.onUser({ ...props.user, status })}
                >
                    {props.user.status === READY ? "Ready" : "I am Ready"}
                </button>
        </div>
    );
}
