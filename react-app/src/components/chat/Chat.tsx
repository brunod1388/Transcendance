import React from "react";
import TopChatBar from "./Chat/TopChatbar";
import Messages from "./Chat/Messages";
import Input from "./Chat/Input";

import "./Chat/chat.scss";


export default function Chat() {
    return (
        <div className="chat">
            <TopChatBar />
            <Messages />
            <Input />
        </div>
    );
}
