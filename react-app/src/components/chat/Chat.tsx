import React, { useState } from "react";
import Message from "./components/Message";
import { AddImageIcon, ContactIcon } from "../../assets/images";
import "./chat.scss";

import User from "./components/User";

const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU";

export default function Chat() {
    const [friendsVisible, setFriendsVisible] = useState(false);

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
