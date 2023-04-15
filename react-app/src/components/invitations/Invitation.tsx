import { useState, useEffect } from "react";
import { removeNotification, createId, addNotification } from "utils";
import {
    InvitationDTO,
    DispatchType,
    GameMode,
    NONE,
    ACCEPTED,
    DECLINED,
    CLASSIC,
} from "@customTypes";
import { Socket } from "socket.io-client";
import { useTimeout } from "hooks";
import { sendResponse } from "utils";
const NOTIFICATION_TIMEOUT = 300000000;

// Create a notification using a reducer
export const CreateInvitation = (
    invitation: InvitationDTO,
    dispatch: DispatchType,
    socket: Socket,
    onPong: (room: string, gameMode: GameMode, host: boolean) => void
) => {
    const id = createId();
    const content = () => (
        <Invitation
            id={id}
            invitation={invitation}
            dispatch={dispatch}
            socket={socket}
            onPong={onPong}
        />
    );
    addNotification(id, invitation.type, content, dispatch);
    return null;
};

interface Props {
    id: string;
    dispatch: DispatchType;
    invitation: InvitationDTO;
    socket: Socket;
    onPong: (room: string, gameMode: GameMode, host: boolean) => void;
}
// Content of the notification, an invitation to play pong
function Invitation({ id, invitation, dispatch, socket, onPong }: Props) {
    const [isDisplay, setIsDisplay] = useState(true);

    // function called when the user interact with the notification or after the timeout is over
    const onClose = (statut: number = NONE) => {
        sendResponse(statut, "pong", invitation.from, invitation.room, socket);
        if (statut === ACCEPTED) {
            onPong(invitation.room, CLASSIC, false);
        }
        removeNotification(id, dispatch);
        setIsDisplay(false);
    };

    // The timeout mentionned previously
    useTimeout(() => {
        onClose();
    }, NOTIFICATION_TIMEOUT);

    return (
        <>
            {isDisplay && invitation.type === "pong" && (
                <div>
                    <button onClick={() => onClose(ACCEPTED)}>accept</button>
                    <button onClick={() => onClose(DECLINED)}>decline</button>
                </div>
            )}
        </>
    );
}
