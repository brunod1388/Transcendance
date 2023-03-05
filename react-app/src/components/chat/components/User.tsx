import React, { useState } from "react";
import UserMenu from "./UserMenu";
import "./user.scss"

type Props = {
    imgSrc?: string;
    hasNewMsg?: boolean;
    keyId: string;
    isPrivate?: boolean;
};

const imgTest =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU";

export default function User(props: Props) {
    const { imgSrc = imgTest, hasNewMsg = false, keyId, isPrivate = false } = props;
    const [selected, setSelected] = useState(false); //use userId when emplemented
    return (
        <div className="userChat" key={keyId}>
            <div
                className="userPlate"
                onClick={() => setSelected(selected ? false : true)}
            >
                <img src={imgSrc} alt="" />
                <div className="userChatInfo">
                    <span>Username</span>
                    {isPrivate && hasNewMsg && <p>last message</p>}
                </div>
                {hasNewMsg && (
                    <div className="newMessage">
                        <span />
                    </div>
                )}
            </div>
            <div
                className="menuContainer"
                style={!selected ? { display: "none" } : {}}
            >
                <UserMenu />
            </div>
        </div>
    );
}
