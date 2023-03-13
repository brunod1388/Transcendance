import React, { useEffect, useState } from "react";
import { AddImageIcon } from "../../../assets/images";
import Message from "./Message";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import { MessageType } from "../../../@types";
import "../styles/feed.scss";

const messageTest: MessageType = {
    id: 0,
    creator: { id: 1, username: "TestUser" },
    created: new Date(Date.now()),
    content: "this is the message content",
};

export default function Feed() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [socket] = useSocket();
    const { channel } = useChat();
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.emit("getMessages", 100, (messages: MessageType[]) => {
            setMessages(messages);
        });
    }, [channel]);

    return (
        <div className="feed">
            <div className="messages">
                {messages.map((message) => (
                    <Message
                        owner={
                            userAuth.id === message.creator.id ? true : false
                        }
                        message={message}
                    />
                ))}
                <Message message={messageTest} />
                <Message message={messageTest} owner={true} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} owner={true} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} owner={true} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} />
                <Message message={messageTest} />
            </div>
            <div className="input">
                <input type="text" placeholder="Type something..." />
                <div className="send">
                    <img src={AddImageIcon} alt="" />
                    <input type="file" style={{ display: "none" }} id="file" />
                    <button className="button-purple">Send</button>
                </div>
            </div>
        </div>
    );
}
