import { messageType } from "../../../@types";
import { messageSample } from "../../../assets/data/messages-sample";
// import Message from "../Message";

function getMessagesFromServer(): messageType[] {
    // TODO
    // temporary
    const messageReceived = messageSample;
    return messageReceived;
}

// export function obtainMessages(): JSX.Element[] {
//     let messageList = getMessagesFromServer();

//     messageList.sort(function (message1, message2) {
//         return message1.created.getTime() - message2.created.getTime();
//     });

//     return messageList.map(
//         (value: messageType, index: number, array: any[]) => <Message />
//     );
// }

export function sendMessage(): void {
    console.log("send message");
}
