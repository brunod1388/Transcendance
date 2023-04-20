import { useState } from "react";
import { removeNotification, createId, addNotification } from "utils";
import {
    InvitationDTO,
    DispatchType,
    GameMode,
    NONE,
    ACCEPTED,
    DECLINED,
    CLASSIC,
    UserType,
} from "@customTypes";
import { Socket } from "socket.io-client";
import { useTimeout } from "hooks";
import { sendResponse } from "utils";
import { NoUserIcon } from "assets/images";
import "../styles/gameInvitation.scss";

// const NOTIFICATION_TIMEOUT = 300000000;
const NOTIFICATION_TIMEOUT = 300000000;

const userTest = { id: 666, username: "username", avatar: NoUserIcon };

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
    user?: UserType;
}
// Content of the notification, an invitation to play pong
function Invitation({
    id,
    invitation,
    dispatch,
    socket,
    onPong,
    user = userTest,
}: Props) {
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
        <div className="game-invitation-container">
            <div className="first-line">
                <div className="user-info">
                    <img src={user.avatar} alt="avatar" />
                    <span className="username">{user.username}</span>
                </div>
                {isDisplay && invitation.type === "pong" && (
                    <div className="invitation-buttons">
                        <button
                            className="accept"
                            onClick={() => onClose(ACCEPTED)}
                        >
                            accept
                        </button>
                        <button
                            className="decline"
                            onClick={() => onClose(DECLINED)}
                        >
                            decline
                        </button>
                    </div>
                )}
            </div>
            <span className="invitation-text">
                An opponent wants to play pong with you.
            </span>
        </div>
    );
}
