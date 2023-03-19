import { createId, addNotification } from "../../utils";
import { useNotifications } from "../../hooks";
import { DispatchType, ResponseDTO } from "../../@types";
import { ResponsePong } from "./ResponsePong";
import { useEffect, useState } from "react";
import { removeNotification } from "../../utils";

export function CreateResponse(response: ResponseDTO, dispatch: DispatchType) {
    const id = createId();
    const content = () => (
        <Response id={id} response={response} dispatch={dispatch} />
    );
    addNotification(id, response.type, content, dispatch);
    return null;
}

interface Props {
    id: string;
    response: ResponseDTO;
    dispatch: DispatchType;
}

function Response({ id, response, dispatch }: Props) {
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
                    room={response.room}
                    accepted={response.statut}
                    onDisplay={onDisplay}
                />
            )}
        </>
    );
}
