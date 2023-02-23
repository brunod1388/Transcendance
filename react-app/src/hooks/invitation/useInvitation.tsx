import {
    InvitationDTO,
    InvitationType,
    InvitationResponseDTO,
    DispatchType,
    Invitation,
} from "../../@types";
import {
    InvitationContent,
    InvitationAcceptedContent,
    InvitationDeclinedContent,
} from "../../components/invitations";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useNotificationsDispatch } from "../../context";
import { NotificationBase } from "../../components/notifications";
import { useSocket } from "..";

const OPEN: boolean = true;
const NONE: boolean = false;

type NotificationRef = MutableRefObject<InvitationNotif>;
type constructorType =
    | constructorInvitation
    | constructorAccepted
    | constructorDeclined;

type constructorInvitation = (
    dispatch: DispatchType,
    notification: NotificationRef,
    invitation: InvitationDTO
) => void;

type constructorAccepted = (
    dispatch: DispatchType,
    notification: NotificationRef,
    response: InvitationResponseDTO
) => void;
type constructorDeclined = (
    dispatch: DispatchType,
    notification: NotificationRef,
    response: InvitationResponseDTO
) => void;

// custom hooks to enable the usage of game notification from other user
export function useInvitation() {
    const [Event, setEvent] = useState<boolean>(NONE);
    const notification = useRef<InvitationNotif>(new InvitationNotif());
    const dispatch = useNotificationsDispatch();
    const [socket] = useSocket();

    useEffect(() => {
        socket.on("game-invitation", (invitation: InvitationDTO) => {
            console.log("invitation-received");
            createNotification(
                createInvitation,
                dispatch,
                notification,
                invitation
            );
            setEvent(OPEN);
        });

        socket.on("game-response", (response: InvitationResponseDTO) => {
            if (response.statut > 0) {
                createNotification(
                    createAccepted,
                    dispatch,
                    notification,
                    response
                );
            } else {
                createNotification(
                    createDeclined,
                    dispatch,
                    notification,
                    response
                );
            }
            setEvent(OPEN);
        });

        return () => {
            socket.off("game-response");
            socket.off("game-invitation");
        };
    }, [dispatch, socket]);

    // Execute each time an event is received (eg: a new invitation is received)
    useEffect(() => {
        if (Event === OPEN) {
            notification.current.open(dispatch);
            setEvent(NONE);
        }
    }, [Event, dispatch]);
}

// This class contains all the notification's informations.
export class InvitationNotif extends NotificationBase implements Invitation {
    content: any;
    invitation: InvitationType;
    constructor() {
        super("invitation");
        this.invitation = { requestId: "", from: "" };
    }
}

function createNotification(
    create: constructorType,
    dispatch: DispatchType,
    notification: NotificationRef,
    arg?: any
) {
    console.log("new Notif");
    notification.current.id = createId();
    create(dispatch, notification, arg);
}

// The notification contains: a unique id, an invitation sent from the server and a content.
function createInvitation(
    dispatch: DispatchType,
    notification: NotificationRef,
    invitation: InvitationDTO
) {
    let id = notification.current.id;
    notification.current.invitation = invitation;
    notification.current.content = () => {
        return (
            <InvitationContent
                invitation={invitation}
                dispatch={dispatch}
                id={id}
            />
        );
    };
}

function createAccepted(
    dispatch: DispatchType,
    notification: NotificationRef,
    response: InvitationResponseDTO
) {
    let id = notification.current.id;
    notification.current.content = () => {
        return (
            <InvitationAcceptedContent
                response={response}
                dispatch={dispatch}
                id={id}
            />
        );
    };
}

function createDeclined(
    dispatch: DispatchType,
    notification: NotificationRef,
    response: InvitationResponseDTO
) {
    let id = notification.current.id;
    notification.current.content = () => {
        return (
            <InvitationDeclinedContent
                response={response}
                dispatch={dispatch}
                id={id}
            />
        );
    };
}

function createId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
