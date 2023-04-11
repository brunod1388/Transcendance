import { createId, addNotification } from "../../utils";
import { DispatchType, ResponseDTO, GameMode } from "../../@types";
import { ResponsePong } from "./ResponsePong";
import { useEffect, useState } from "react";
import { removeNotification } from "../../utils";
import { Socket } from "socket.io-client";

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
            {isDisplay && response.type === "pong" && (
                <ResponsePong
                    onPong={onPong}
                    room={response.room}
                    accepted={response.statut}
                    onDisplay={onDisplay}
                    socket={socket}
                />
            )}
        </>
    );
}
