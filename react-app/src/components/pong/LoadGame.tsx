import { CONNECTED, GameConfig, PlayerInfo, READY } from "../../@types";
import { PropsWithChildren } from "react";
import { playersAreReady } from "./GameService";

interface Props {
    user: PlayerInfo;
    config: GameConfig;
    opponent: PlayerInfo;
    onUser: (player: PlayerInfo) => void;
}

export function LoadGame(props: PropsWithChildren<Props>) {
    const status = props.user.status !== READY ? READY : CONNECTED;

    if (playersAreReady(props.user, props.opponent) === true) {
        return <>{props.children}</>;
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
