import React from "react";
// import { useContext } from "react";
import avatar from "../../../assets/images/smile.png";


export default function TopChatbar() {
    // const { currentUser } = useContext(AuthContext);

    return (
        <div className="topChatBar">
            <span className="logo">ChannelName</span>
            <div className="user">
                <img src={avatar} alt="" />
                <span>Kikou</span>
                <button className="button-purple" onClick={() => {}}>
                    logout
                </button>
            </div>
        </div>
    );
}
