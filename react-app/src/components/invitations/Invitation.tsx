import {
    InvitationResponseDTO,
    InvitationType,
    DispatchType,
} from "../../@types";
import { useSocket, useTimeout } from "../../hooks";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { close } from "../../context";

const NONE = 0;
const ACCEPTED = 1;
const DECLINED = -1;
const CLOSE = -1;

interface Props {
    id: string;
    dispatch: DispatchType;
    invitation: InvitationType;
}

// This notification contains two button to respond to the invitation,
// and a timer that decline the invitation after an amount of time.
export function InvitationContent(props: Props) {
    const [Response, setResponse] = useState<number>(NONE);
    const navigate = useNavigate();
    const [socket] = useSocket();

    useTimeout(() => {
        setResponse(DECLINED);
    }, 3000);

    useEffect(() => {
        if (Response !== NONE) {
            sendResponse(props.invitation, Response, socket);
            close(props.dispatch, props.id);
            if (Response === ACCEPTED) {
                setResponse(NONE);
                navigate(`/pong?room=${props.invitation.requestId}`);
            } else {
                setResponse(NONE);
            }
        }
    }, [Response, props, navigate, socket]);

    return (
        <div>
            <button onClick={() => setResponse(ACCEPTED)}>accept</button>
            <button onClick={() => setResponse(DECLINED)}>decline</button>
        </div>
    );
}

interface ResponseProps {
    id: string;
    dispatch: DispatchType;
    response: InvitationResponseDTO;
}

// This notification contains two button to respond to the invitation,
// and a timer that decline the invitation after an amount of time.
export function InvitationAcceptedContent(props: ResponseProps) {
    const [Event, setEvent] = useState<number>(NONE);
    const [joinRoom, setJoinRoom] = useState<boolean>(false);
    const navigate = useNavigate();
    const [socket] = useSocket();

    useTimeout(() => {
        setEvent(CLOSE);
    }, 3000);

    useEffect(() => {
        if (Event === CLOSE) {
            close(props.dispatch, props.id);
            setEvent(NONE);
        }
        if (joinRoom === true) {
            socket.emit("join", props.response.requestId);
            navigate(`/pong?room=${props.response.requestId}`);
            setJoinRoom(false);
        }
    }, [joinRoom, Event, props, navigate, socket]);

    return (
        <div>
            User {props.response.fromUser} has accepted your invitation.
            <button
                onClick={() => {
                    setEvent(CLOSE);
                    setJoinRoom(true);
                }}
            >
                JOIN
            </button>
        </div>
    );
}

// This notification contains two button to respond to the invitation,
// and a timer that decline the invitation after an amount of time.
export function InvitationDeclinedContent(props: ResponseProps) {
    const [Event, setEvent] = useState<number>(NONE);

    useTimeout(() => {
        setEvent(CLOSE);
    }, 3000);

    useEffect(() => {
        if (Event === CLOSE) {
            close(props.dispatch, props.id);
            setEvent(NONE);
        }
    }, [Event, props]);

    return (
        <div>User {props.response.fromUser} has declined your invitation.</div>
    );
}

export function sendResponse(
    invitation: InvitationType,
    result: number,
    socket: Socket
) {
    console.log(`statut: ${result}`);
    let response: InvitationResponseDTO = {
        requestId: invitation.requestId,
        fromUser: invitation.from,
        statut: result,
    };
    console.log(`response sent: ${result} ${invitation}`);
    socket.emit("game-response", response);
}
