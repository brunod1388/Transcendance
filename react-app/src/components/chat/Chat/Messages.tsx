import React from "react";
import Message from "./Message";

interface Props {}
const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU";

export default function Messages({}: Props) {
    return (
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
    );
}
