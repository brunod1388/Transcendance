import { useInput } from "../../../hooks/useInput";
import { Input } from "../../../components/Input";
import { SubmitButton } from "../../../components/SubmitButton";
import { Room } from "../data/room-sample";
import { sendMessage } from "../services/chat-server";
import { style } from "..";

interface Props {
    room: Room;
}

export function MessageInputBar(props: Props) {
    const text: string = `Send a message to ${props.room.roomName}`;
    const messageBar = useInput("", text, "messageInputBar", "text", true);

    return (
        <div className={style.writting_container}>
            <Input
                content={messageBar}
                divStyle={style.input_container}
                fill={true}
            />
            <SubmitButton
                placeholder="send"
                divStyle={style.button_container}
                onClick={sendMessage}
                fill={true}
            />
        </div>
    );
}
