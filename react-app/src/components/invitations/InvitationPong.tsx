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
import { Socket } from "socket.io-client";

interface Props {
    invitation: InvitationDTO;
    id: string;
    onDisplay: (result: boolean) => void;
    socket: Socket;
    onPong: (room: string, gameMode: GameMode, host: boolean) => void;
}

const NOTIFICATION_TIMEOUT = 300000000;
// const NOTIFICATION_TIMEOUT = 3000;

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
    }, NOTIFICATION_TIMEOUT);

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
