import React from "react";

export default function Search() {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="type a user" />
            </div>
            <div className="userChat">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF6qx2Sw1RVNAU_cLLe9v0H32Rvufjjbrqsw&usqp=CAU"
                    alt=""
                />
                <div className="UserChatInfo">
                    <span>Jane</span>
                </div>
            </div>
        </div>
    );
}
