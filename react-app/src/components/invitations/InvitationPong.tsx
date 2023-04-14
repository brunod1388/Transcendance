import {
    NONE,
    ACCEPTED,
    DECLINED,
    InvitationDTO,
    CLASSIC,
    GameMode,
} from "@customTypes";
import { useNotificationsDispatch } from "hooks";
import { useTimeout } from "hooks";
import { removeNotification } from "utils";
import { joinGame, sendResponse } from "utils";
import { useFeature } from "context";
import { Socket } from "socket.io-client";

interface Props {
    invitation: InvitationDTO;
    id: string;
    onDisplay: (result: boolean) => void;
    socket: Socket;
    onPong: (room: string, gameMode: GameMode, host: boolean) => void;
}

// This notification contains two button to respond to the invitation,
export function InvitationPong({
    id,
    invitation,
    onDisplay,
    socket,
    onPong,
}: Props) {
    const dispatch = useNotificationsDispatch();

    useTimeout(() => {
        onClose();
    }, 3000);

    const onClose = (statut: number = NONE) => {
        sendResponse(statut, "pong", invitation.from, invitation.room, socket);
        if (statut === ACCEPTED) {
            console.log(invitation.room);
            joinGame(socket, invitation.room, CLASSIC);
            onPong(invitation.room, CLASSIC, false);
        }
        removeNotification(id, dispatch);
        onDisplay(false);
    };

    return (
        <div>
            <button onClick={() => onClose(ACCEPTED)}>accept</button>
            <button onClick={() => onClose(DECLINED)}>decline</button>
        </div>
    );
}
