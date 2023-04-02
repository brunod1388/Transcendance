import { useSocket } from "../../hooks";
import { useTimeout } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { joinGame } from "../../utils";
import { useFeature } from "../../context";
import { Feature } from "../../context";
import { Socket } from "socket.io-client";
import { CLASSIC, GameMode } from "../pong/Game";

interface Props {
    room: string;
    accepted: number;
    onDisplay: (result: boolean) => void;
    socket: Socket;
    onPong: (room: string, gameMode: GameMode) => void;
}

export function ResponsePong({
    room,
    accepted,
    onDisplay,
    socket,
    onPong,
}: Props) {
    const { setFeature } = useFeature();

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
                    onPong(room, CLASSIC);
                }}
            >
                JOIN
            </button>
        </div>
    );
}
