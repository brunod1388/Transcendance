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
import { PropsWithChildren, useEffect } from "react";
import { playersAreReady } from "./GameService";
import { useSocket } from "hooks";
import { EndScreen } from "./components/EndScreen";
import "assets/styles/animationStyle.scss";
import "./styles/loadGame.scss";

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
    const { children, gameStarted, onGameStarted, user } = props;
    const { opponent, score, onUser, onMode, mode, room } = props;
    const status = user.status !== READY ? READY : CONNECTED;
    const [socket] = useSocket();
    useEffect(() => {
        if (gameStarted === false && playersAreReady(user, opponent) === true) {
            onGameStarted(true);
        }
    }, [user, opponent, gameStarted]);

    if (gameStarted === true && opponent.status !== DISCONECTED) {
        return <>{children}</>;
    } else if (gameStarted === true && opponent.status === DISCONECTED) {
        return <EndScreen user={user} opponent={opponent} score={score} />;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = !e.target.checked ? CLASSIC : PINGPONG;
        socket.emit("game-mode", { mode: value, room: room });
        onMode(value);
    }

    return (
        <div className="load-game">
            <div className="title">
                <span>Waiting opponent</span>
                <div className="container">
                    <div className="dot-carousel"></div>
                </div>
            </div>
            {user.host && (
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
            )}
            {user.host === false && (
                <div className="mode">
                    <span>Mode</span> <span>{mode}</span>
                </div>
            )}
            <button
                className={
                    "button-purple" + (status === READY ? " iamready" : "")
                }
                onClick={() => onUser({ ...user, status })}
            >
                {user.status === READY ? "Ready" : "I am Ready"}
            </button>
        </div>
    );
}
