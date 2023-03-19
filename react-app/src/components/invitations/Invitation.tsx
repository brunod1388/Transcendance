import { useNotifications, useSocket } from "../../hooks";
import { useState, useEffect } from "react";
import { removeNotification, createId, addNotification } from "../../utils";
import { InvitationDTO, DispatchType } from "../../@types";
import { InvitationPong } from "./InvitationPong";
import {Socket} from "socket.io-client";

export const CreateInvitation = (
    invitation: InvitationDTO,
    dispatch: DispatchType,
	socket: Socket
) => {
    const id = createId();
    const content = () => (
        <Invitation id={id} invitation={invitation} dispatch={dispatch} socket={socket}/>
    );
    addNotification(id, invitation.type, content, dispatch);

    return null;
}

interface Props {
    id: string;
    dispatch: DispatchType;
    invitation: InvitationDTO;
	socket: Socket
}

function Invitation({ id, invitation, dispatch, socket }: Props) {
    const [isDisplay, setIsDisplay] = useState(true);

    const onDisplay = (result: boolean) => {
        setIsDisplay(result);
    };

    useEffect(() => {
        if (isDisplay === false) {
            removeNotification(id, dispatch);
        }
    }, [isDisplay]);

    return (
        <>
            {isDisplay && invitation.type === "pong" && (
                <InvitationPong
                    id={id}
                    invitation={invitation}
                    onDisplay={onDisplay}
					socket={socket}
                />
            )}
        </>
    );
}
