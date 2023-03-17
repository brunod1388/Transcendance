import React, { useEffect } from "react";
import NewChannel from "./NewChannel";
import ChannelButton from "./ChannelButton";
import { useState } from "react";
import {
    ChatIcon,
    AddChannelIcon,
    NoChannelIcon,
} from "../../../assets/images";
import {
    useAuth,
    useChat,
    Feature,
    useFeature,
    ChannelDetailsType,
} from "../../../context";
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
        socket.on("Channels", (chans) => {
            setChannels(chans);
        });
        return () => { socket.off("Channels") };
    }, [socket]);

    function joinRoom(channel: ChannelDetailsType) {
        // socket.emit("joinRoom", userAuth.id, channel);
        socket.emit("joinRoom", {userid: userAuth.id, channelid: channel.id}
            // , (res: string) => {console.log(res)}
        );
    }

    function leaveRoom() {
        if (channel.room === "")
            return
        socket.emit("leaveRoom", userAuth.id, channel.room);
        channel.room = "";
    }

    function privateClick() {
        if (feature !== Feature.Chat) setFeature(Feature.Chat);
        updateChannel({
            ...channel,
            id: 0,
            name: "Private Message",
            type: "directMessage",
        });
    }

    function channelClick(id: number) {
        leaveRoom();
        if (feature !== Feature.Chat) setFeature(Feature.Chat);
        let channel = channels?.find((chan) => {
            return chan.id === id;
        });
        if (channel === undefined) {
            console.log("error: channel could not be found");
            return;
        }
        const name: string = channel ? channel.name : "";
        const channelDetails = {
            id: Number(id),
            name: name,
            type: "channel",
            image: channel?.image ? channel.image : NoChannelIcon,
            room: "room-" + channel.id,
        };
        updateChannel(channelDetails);
        joinRoom(channelDetails);
    }

    function addClick() {
        if (feature !== Feature.Chat) setFeature(Feature.Chat);
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
            <div className="channel_wrapper">
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
