import React from "react";

interface Props {
    owner?: boolean;
    imageUrl?: any;
}

const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU";

export default function Message(props: Props) {
    const { owner = false, imageUrl = "" } = props;
    return (
        <div className={"message" + (owner ? " owner" : "")}>
            <div className="messageInfo">
                <img src={imgUrl} alt="" />
                <span>Time</span>
            </div>
            <div className="messageContent">
                <p>messageContent</p>
                <img src={imageUrl} alt="" />
            </div>
        </div>
    );
}
