import React from "react";

type Props = {};

export default function Chats({}: Props) {
    return (
        <div className="chats">
            <div className="userChat">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>hello</p>
                </div>
            </div>
            <div className="userChat">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>hello</p>
                </div>
            </div>
            <div className="userChat">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>hello</p>
                </div>
            </div>
        </div>
    );
}
