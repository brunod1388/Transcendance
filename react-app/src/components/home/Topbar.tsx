import React from "react";
// import { useContext } from "react";
import avatar from "../../assets/images/smile.png";
import setting from "../../assets/images/setting.png";
import play from "../../assets/images/play2.png";
import addContact from "../../assets/images/add-user.png";
import "./home.scss";

export default function Topbar() {
    // const { currentUser } = useContext(AuthContext);

    return (
        <div className="topbar">
            <span className="channelName">ChannelName</span>
            <div className="user">
                <img className="avatar" src={avatar} alt="" />
                <span>Kikou</span>
                <img className="imgButton" src={play} alt="" />
                <img className="imgButton" src={addContact} alt="" />
                <img className="imgButton" src={setting} alt="" />
                <button className="button-purple" onClick={() => {}}>
                    logout
                </button>
            </div>
        </div>
    );
}
