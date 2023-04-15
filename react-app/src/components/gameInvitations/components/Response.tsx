import { createId, addNotification, removeNotification } from "utils";
import { DispatchType, ResponseDTO, GameMode, CLASSIC } from "@customTypes";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useTimeout } from "hooks";

const INVITATION_TIMEOUT = 1000000;
// const INVITATION_TIMEOUT = 3000;

export const CreateResponse = (
    response: ResponseDTO,
    dispatch: DispatchType,
    socket: Socket,
    onPong: (room: string, gameMode: GameMode, host: boolean) => void
) => {
    const id = createId();
    const content = () => (
        <Response
            id={id}
            response={response}
            dispatch={dispatch}
            socket={socket}
            onPong={onPong}
        />
    );
    addNotification(id, response.type, content, dispatch);
    return null;
};

interface Props {
    id: string;
    response: ResponseDTO;
    dispatch: DispatchType;
    socket: Socket;
    onPong: (room: string, gameMode: GameMode, host: boolean) => void;
}

function Response({ id, response, dispatch, socket, onPong }: Props) {
    const [isDisplay, setIsDisplay] = useState(true);

    useTimeout(() => {
        onClose();
    }, INVITATION_TIMEOUT);

    // function called when the user interact with the notification or after the timeout is over
    const onClose = () => {
        removeNotification(id, dispatch);
        setIsDisplay(false);
    };

    return (
        <div className="game-invitation-container">
            {isDisplay && response.type === "pong" && response.statut <= 0 && (
                <div>Your opponent declined the invitation.</div>
            )}
            {isDisplay && response.type === "pong" && response.statut > 0 && (
                <div>
                    Your opponent accepted the invitation.
                    <button
                        onClick={() => {
                            onPong(response.room, CLASSIC, true);
                            onClose();
                        }}
                    >
                        JOIN
                    </button>
                </div>
            )}
        </div>
    );
}
