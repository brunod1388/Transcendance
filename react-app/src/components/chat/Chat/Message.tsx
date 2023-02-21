import React from "react";

type Props = {};

export default function Message({}: Props) {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
            </div>
        </div>
    );
}
