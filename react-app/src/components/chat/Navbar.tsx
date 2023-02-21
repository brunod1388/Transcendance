import React from "react";
import ChannelIcon from "./Navbar/ChannelIcon";
import smile from "../../assets/images/smile-blue.png";
import jouer from "../../assets/images/jouer.png";
import plus from "../../assets/images/plus.png";
import "./Navbar/navbar.scss";
import NewChannel from "./Navbar/NewChannel";

type Props = {};

export default function Navbar({}: Props) {

    const channels: any[] = [{name: "channel1", imageUrl: smile},
                             {name: "channel2", imageUrl: smile},
                             {name: "channel3", imageUrl: smile}]
    return (
        <div className="navbar">
            <ChannelIcon filter={true} name="PrivateMessage" image={jouer} />
            <span />
            <div className="icon_wrapper">
                {channels.map((channel) =>
                    <ChannelIcon name={channel.name} image={channel.imageUrl}/>
                )}
                {channels.map((channel) =>
                    <ChannelIcon name={channel.name} image={channel.imageUrl}/>
                )}
                {channels.map((channel) =>
                    <ChannelIcon name={channel.name} image={channel.imageUrl}/>
                )}
                {channels.map((channel) =>
                    <ChannelIcon name={channel.name} image={channel.imageUrl}/>
                )}
                {channels.map((channel) =>
                    <ChannelIcon name={channel.name} image={channel.imageUrl}/>
                )}
            </div>
            <span />
            <ChannelIcon filter={true} name="Add Channel" image={plus} />
        </div>
    );
}
