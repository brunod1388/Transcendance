import { obtainMessages } from "../services/chat-server";
import { style } from "..";

export function Feed() {
    const messagesRecieved: JSX.Element[] = obtainMessages();
    return <div className={style.messages_container}>{messagesRecieved}</div>;
}
