import React, { useEffect, useState } from "react";
import Message from "./components/Message";
import { AddImageIcon, ContactIcon } from "../../assets/images";
import "./chat.scss";

import User from "./components/User";
import { useAuth, useChat } from "../../context";
import { useSocket } from "../../hooks";
import Sidebar from "./components/Sidebar";
import Friendbar from "./components/Friendbar";
import Feed from "./components/Feed";

export default function Chat() {
    const [friendsVisible, setFriendsVisible] = useState(false);

    return (
        <div className="chat">
            <Sidebar />
            <Feed />
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
                <Friendbar />
            )}
        </div>
    );
}
