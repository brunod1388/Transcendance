import { FormEvent, useEffect, useState } from "react";
import { AddImageIcon } from "../../../assets/images";
import Message from "./Message";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import { MessageType } from "../../../@types";
import "../styles/feed.scss";

const NB_MESSAGE = 5;

const messageTest: MessageType = {
    id: 0,
    creator: { id: 1, username: "TestUser" },
    createdAt: new Date(Date.now()),
    modifiedAt: new Date(Date.now()),
    content: "this is the message content",
};

export default function Feed() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [socket] = useSocket();
    const { channel } = useChat();
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.on("NLastMessage", (messages) => {
            setMessages(messages);
        });
        socket.on("messageListener", (message) => {
            console.log("message recu : ", message);
            console.log("messages: ", messages);
            setMessages((state) => [message, ...state]);
        });
        return () => {
            socket.off("NLastMessage");
        };
    }, [socket]);

    // useEffect(() => {
    //     return () => {
    //         socket.off("MessageListener");
    //     };
    // }, [socket]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const content = e.currentTarget.msgContent.value;
        socket.emit(
            "createMessage",
            {
                userId: userAuth.id,
                channelId: channel.id,
                content: content,
            }
            // (res: any) => {
            //     if (res !== "message created")
            //         console.log("error: message not saved");
            // }
        );
    }

    return (
        <div className="feed">
            <div className="messages">
                {messages.map((message, i) => (
                    <Message
                        owner={
                            userAuth.id === message.creator.id ? true : false
                        }
                        message={message}
                        key={i}
                    />
                ))}
            </div>
            <div className="input">
                <form onSubmit={handleSubmit} className="send">
                    <input
                        name="msgContent"
                        type="text"
                        placeholder="Type something..."
                    />
                    <img src={AddImageIcon} alt="" />
                    <input
                        name="img"
                        type="file"
                        style={{ display: "none" }}
                        id="file"
                    />
                    <button type="submit" className="button-purple">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
