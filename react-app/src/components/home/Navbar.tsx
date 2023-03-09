import React from "react";
import NewChannel from "./Navbar/NewChannel";
import ChannelButton from "./Navbar/ChannelButton";
import { useState } from "react";
import { ChatIcon, AddChannelIcon, NoChannelIcon } from "../../assets/images";
import "./Navbar/navbar.scss";

export default function Navbar() {
    const channels: any[] = [
        { name: "channel1", imageUrl: NoChannelIcon },
        { name: "channel2", imageUrl: NoChannelIcon },
        { name: "channel3", imageUrl: NoChannelIcon },
    ];
    const [newChannel, setNewChannel] = useState(false);

    function privateClick() {}

    function iconClick() {}

    function addClick() {
        setNewChannel(true);
    }

    return (
        <div className="navbar">
            <ChannelButton
                filter={true}
                name="PrivateMessage"
                image={ChatIcon}
                onClick={privateClick}
            />
            <span className="separator" />
            <div className="icon_wrapper">
                {channels.map((channel, i) => (
                    <ChannelButton
                        name={channel.name}
                        image={channel.imageUrl}
                        onClick={iconClick}
                        key={`${i}`}
                    />
                ))}
            </div>
            <span className="separator" />
            <ChannelButton
                filter={true}
                name="Add Channel"
                image={AddChannelIcon}
                onClick={addClick}
            />
            {newChannel && <NewChannel quitForm={() => setNewChannel(false)} />}
        </div>
    );
}
