import React from "react";
import ChannelIcon from "./Navbar/ChannelIcon";
import smile from "../../assets/images/smile-blue.png";
import jouer from "../../assets/images/jouer.png";
import plus from "../../assets/images/plus.png";
import "./Navbar/navbar.scss";
import NewChannel from "./Navbar/NewChannel";
import { useState } from "react";

type Props = {};

export default function Navbar({}: Props) {
    const channels: any[] = [
        { name: "channel1", imageUrl: smile },
        { name: "channel2", imageUrl: smile },
        { name: "channel3", imageUrl: smile },
    ];
    const [newChannel, setNewChannel] = useState(false);

    function privateClick() {}

    function iconClick() {}

    function addClick() {
        setNewChannel(true);
    }

    return (
        <div className="navbar">
            <ChannelIcon
                filter={true}
                name="PrivateMessage"
                image={jouer}
                onClick={privateClick}
            />
            <span className="separator" />
            <div className="icon_wrapper">
                 {channels.map((channel) => (
                    <ChannelIcon
                        name={channel.name}
                        image={channel.imageUrl}
                        onClick={iconClick}
                    />
                ))}
                {/*
                {channels.map((channel) => (
                    <ChannelIcon
                        name={channel.name}
                        image={channel.imageUrl}
                        onClick={iconClick}
                    />
                ))}
                {channels.map((channel) => (
                    <ChannelIcon
                        name={channel.name}
                        image={channel.imageUrl}
                        onClick={iconClick}
                    />
                ))}
                {channels.map((channel) => (
                    <ChannelIcon
                        name={channel.name}
                        image={channel.imageUrl}
                        onClick={iconClick}
                    />
                ))}
                {channels.map((channel) => (
                    <ChannelIcon
                        name={channel.name}
                        image={channel.imageUrl}
                        onClick={iconClick}
                    />
                ))} */}
            </div>
            <span className="separator" />
            <ChannelIcon
                filter={true}
                name="Add Channel"
                image={plus}
                onClick={addClick}
            />
            {newChannel && <NewChannel />}
        </div>
    );
}
