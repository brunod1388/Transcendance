import { messageType } from "../../../@types/messageType";
import { messageSample } from "../../../assets/data/messages-sample";
// import Message from "../Message";

function getMessagesFromServer(): messageType[] {
    // TODO
    // temporary
    const messageReceived = messageSample;
    return messageReceived;
}

export function sendMessage(): void {
    console.log("send message");
}
