import style from "../styles/MessagesPage.module.css";
import { Feed } from "./Feed";
import { MessageInputBar } from "./MessageInputBar";
import { Room } from "../data/room-sample";

interface Props {
    room: Room;
}

export function Chat(props: Props) {
    return (
        <>
            <hr className={style.hrMessage} />
            <Feed />
            <hr className={style.hrMessage} />
            <MessageInputBar room={props.room} />
        </>
    );
}

export default Chat;
