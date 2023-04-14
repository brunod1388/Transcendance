import { useTimeout } from "hooks";
import { joinGame } from "utils";
import { Socket } from "socket.io-client";
import { CLASSIC, GameMode } from "@customTypes";

interface Props {
    room: string;
    accepted: number;
    onDisplay: (result: boolean) => void;
    socket: Socket;
    onPong: (room: string, gameMode: GameMode, host: boolean) => void;
}

export function ResponsePong({
    room,
    accepted,
    onDisplay,
    socket,
    onPong,
}: Props) {
    useTimeout(() => {
        onDisplay(false);
    }, 3000);

    if (accepted <= 0) {
        return <div>Your opponent declined the invitation.</div>;
    }
    return (
        <div>
            Your opponent accepted the invitation.
            <button
                onClick={() => {
                    onDisplay(false);
                    joinGame(socket, room, CLASSIC);
                    onPong(room, CLASSIC, true);
                }}
            >
                JOIN
            </button>
        </div>
    );
}
