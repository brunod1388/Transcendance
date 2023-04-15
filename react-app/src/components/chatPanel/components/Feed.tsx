import { FormEvent, useEffect, useState } from "react";
import { AddImageIcon } from "assets/images";
import Message from "./Message";
import { useAuth, useChat } from "context";
import { useSocket } from "hooks";
import { MessageType } from "@customTypes";
import "../styles/feed.scss";

export default function Feed() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [socket] = useSocket();
    const { channel } = useChat();
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.on("NLastMessage", (messages) => {
            setMessages(messages);
        });
        return () => {
            socket.off("NLastMessage");
        };
    }, [socket]);

    useEffect(() => {
        socket.on("messageListener", (message) => {
            setMessages((state) => [message, ...state]);
        });
        return () => {
            socket.off("messageListener");
        };
    }, [socket]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const content = e.currentTarget.msgContent.value;
        if (content === "") return;
        socket.emit("createMessage", {
            userId: userAuth.id,
            channelId: channel.id,
            content: content,
        });
        e.currentTarget.msgContent.value = "";
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
                        next={i < messages.length ? messages[i + 1] : undefined}
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
