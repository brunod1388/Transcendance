import React from "react";
import "./message.scss";
import { NoUserIcon } from "../../../assets/images";
import { MessageType } from "../../../@types";

interface Props {
    owner?: boolean;
    message: MessageType;
}

const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU";

export default function Message(props: Props) {
    const { owner = false, message } = props;
    const avatar = message.creator.avatar;
    const date = message.created;

    return (
        <div className={"message" + (owner ? " owner" : "")}>
            <div className="messageInfo">
                <img src={avatar === undefined ? NoUserIcon : avatar}
                    alt=""
                />
                <span></span>
            </div>
            <div className="messageContent">
                <div className="details">
                    <span className="username">{message.creator.username}</span>
                    <span className="date">{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                </div>
                {/* <img src={imageUrl} alt="" /> */}
                <p>{message.content}</p>
            </div>
        </div>
    );
}
