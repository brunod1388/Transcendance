import React from "react";
import { useContext } from "react";
import avatar from "../../../assets/images/smile.png";

type Props = {};

export default function TopChatbar({}: Props) {
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
