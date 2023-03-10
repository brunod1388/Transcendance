import React, { useEffect } from "react";
import NewChannel from "./NewChannel";
import ChannelButton from "./ChannelButton";
import { useState } from "react";
import { ChatIcon, AddChannelIcon, NoChannelIcon } from "../../../assets/images";
import { useAuth, useChat, Feature, useFeature  } from "../../../context";
import { useSocket } from "../../../hooks";
import { ChannelType } from "../../../@types";
import "../styles/navbar.scss";

function Navbar() {
    const [newChannel, setNewChannel] = useState(false);
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const [channels, setChannels] = useState<ChannelType[]>([]);
    const { channel, updateChannel } = useChat();
    const { feature, setFeature } = useFeature();

    useEffect(() => {
        socket.emit("getChannels", userAuth.id, (res: ChannelType[]) => {
            setChannels(res);
        });
    }, [userAuth, newChannel]);

    function privateClick() {
        if (feature !== Feature.Chat)
            setFeature(Feature.Chat)
        updateChannel({
            ...channel,
            currentChannelId: 0,
            currentChannelName: "Private Message",
            currentChannelType: "directMessage",
        });
    }

    function channelClick(id: number) {
        if (feature !== Feature.Chat)
            setFeature(Feature.Chat)
        let channelName = channels?.find((chan) => {
            return chan.id == id;
        })?.name;
        const currentChannelName: string = channelName ? channelName : "";
        updateChannel({
            currentChannelId: id,
            currentChannelName: currentChannelName,
            currentChannelType: "channel",
        });
    }

    function addClick() {
        if (feature !== Feature.Chat)
            setFeature(Feature.Chat)
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
                {channels?.map((chan) => (
                    <ChannelButton
                        name={chan.name}
                        image={chan.image === null ? NoChannelIcon : chan.image}
                        onClick={() => {
                            channelClick(chan.id);
                        }}
                        key={chan.id}
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

export { Navbar };