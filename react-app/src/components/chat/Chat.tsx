import React from "react";
import TopChatBar from "./Chat/TopChatbar";
import Messages from "./Chat/Messages";
import Input from "./Chat/Input";

import "./Chat/chat.scss";

type Props = {};

export default function Chat({}: Props) {
    return (
        <div className="chat">
            <TopChatBar />
            <Messages />
            <Input />
        </div>
    );
}
