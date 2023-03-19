import { useSocket } from "../../hooks";
import { useTimeout } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { joinGame } from "../../utils";
import { useFeature } from "../../context";
import { Feature } from "../../context";
import { Socket } from "socket.io-client";

interface Props {
    room: string;
    accepted: number;
    onDisplay: (result: boolean) => void;
    socket: Socket;
}

export function ResponsePong({ room, accepted, onDisplay, socket }: Props) {
    const { setFeature } = useFeature();
    const [searchParams, setSearchParams] = useSearchParams();

    const activatePong = (roomName: string) => {
        setFeature(Feature.Pong);
        setSearchParams({ ["room"]: roomName });
    };

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
                    joinGame(socket, room, activatePong);
                }}
            >
                JOIN
            </button>
        </div>
    );
}
