import React, { useEffect, useState } from "react";
import Message from "./components/Message";
import { AddImageIcon, ContactIcon } from "../../assets/images";
import "./chat.scss";

import User from "./components/User";
import { useAuth, useChat } from "../../context";
import { useSocket } from "../../hooks";

const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU";

export enum rightType {
    NORMAL = "normal",
    ADMIN = "admin",
}

interface UserType {
    id: number;
    username: string;
    avatar?: string;
    rights: rightType;
}

interface MessageType {
    id: number;
    ownerId: number;
    created: Date;
    content: string;
    image?: string;
}


export default function Chat() {
    const [friendsVisible, setFriendsVisible] = useState(false);
    const {channel} = useChat();
    const [socket] = useSocket();
    const [users, setUsers] = useState<UserType[]>([]);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const {userAuth} = useAuth();

    useEffect(() => {
        if (channel.currentChannelType == "channel")
            socket.emit("getChannelUsers", channel.currentChannelId, (usersReceived: UserType[]) => {
                console.log(usersReceived);
                setUsers(usersReceived);
            });
        else
            socket.emit("getPrivateUsers", channel.currentChannelId, userAuth.id, (usersReceived: UserType[]) => {
                setUsers(usersReceived);
            });

        socket.emit("getMessages",  100, (messages: MessageType[]) => {
            setMessages(messages);
        });
    }, [channel])

    return (
        <div className="chat">
            <div className="SideBar">
                <div className="search">
                    <div className="searchForm">
                        <input type="text" placeholder="type a user" />
                    </div>
                    <User keyId="searchUser" />
                </div>
                <div className="users">
                    {[...Array(20)].map((e, i) => (
                        <User
                            isPrivate={true}
                            hasNewMsg={i % 3 === 0 ? true : false}
                            keyId={`d${i}`}
                            key={i}
                        />
                    ))}
                </div>
            </div>
            {/* <Sidebar /> */}
            <div className="feed">
                <div className="messages">
                    <Message />
                    <Message owner={true} />
                    <Message imageUrl={imgUrl} />
                    <Message />
                    <Message />
                    <Message owner={true} />
                    <Message />
                    <Message />
                    <Message owner={true} />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                </div>
                <div className="input">
                    <input type="text" placeholder="Type something..." />
                    <div className="send">
                        <img src={AddImageIcon} alt="" />
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                        />
                        <button className="button-purple">Send</button>
                    </div>
                </div>
            </div>
            <div className="button_container">
                <button
                    className="friendButton"
                    onClick={() => {
                        setFriendsVisible(friendsVisible ? false : true);
                    }}
                >
                    <img src={ContactIcon} alt="" />
                </button>
            </div>
            {friendsVisible && (
                <div className="friendBar">
                    <span className="title">Friends</span>
                    {[...Array(20)].map((e, i) => (
                        <User isPrivate={true} keyId={`d${i}`} key={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
