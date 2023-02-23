import React from "react";

type Props = {
    isPrivate?: boolean;
    isNewMessage?: boolean;
};

export default function Users(props: Props) {
    const { isPrivate = false, isNewMessage = true } = props;

    return (
        <div className="users">
            <div className="userChat" key="id">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Username</span>
                    <p>last message</p>
                </div>
                {isNewMessage && (
                    <div className="newMessage">
                        <span />
                    </div>
                )}
            </div>
            {[...Array(20)].map((e, i) => (
                <div className="userChat" key={`d${i}`}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                        alt=""
                    />
                    <div className="userChatInfo">
                        <span>Username</span>
                        {isPrivate && <p>last message</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
