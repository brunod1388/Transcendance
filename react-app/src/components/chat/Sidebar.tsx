import React from "react";
import Search from "./Sidebar/Search";
import Users from "./Sidebar/Users";

import Cam from "../../assets/images/cam.png";
import Add from "../../assets/images/add.png";
import More from "../../assets/images/more.png";
import "./Sidebar/sidebar.scss";

type Props = {};

export default function Sidebar({}: Props) {
    return (
        <div className="SideBar">
            <div className="channelInfo">
                <span>Channel Name</span>
                <div className="chatIcons">
                    {/* <img src={Cam} alt="" />
                    <img src={Add} alt="" /> */}
                    <img src={More} alt="" />
                </div>
            </div>
            <Search />
            <Users />
        </div>
    );
}
