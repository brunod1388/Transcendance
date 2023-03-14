import React, { FormEvent, useCallback, useEffect, useState } from "react";
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
        socket.emit("getMessages", channel.id, NB_MESSAGE, (messages: MessageType[]) => {
            setMessages(messages);
            console.log(messages);
        });
    }, [channel]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const content = e.currentTarget.msgContent.value;
        socket.emit("createMessage", {
            userId: userAuth.id,
            channelId: channel.id,
            content: content}, (res: any) => {
            console.log(res);
        })
    };

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
            </div>
            <div className="input">
                <form onSubmit={handleSubmit} className="send">
                    <input name="msgContent" type="text" placeholder="Type something..." />
                    <img src={AddImageIcon} alt="" />
                    <input name="img" type="file" style={{ display: "none" }} id="file" />
                    <button className="button-purple">Send</button>
                </form>
                {/* <div className="send">
                </div> */}
            </div>
        </div>
    );
}
