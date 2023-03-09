import React, { useEffect } from "react";
import NewChannel from "./Navbar/NewChannel";
import ChannelButton from "./Navbar/ChannelButton";
import { useState } from "react";
import { ChatIcon, AddChannelIcon, NoChannelIcon } from "../../assets/images";
import "./Navbar/navbar.scss";
import { useAuth, useChat } from "../../context";
import { useSocket } from "../../hooks";
import {ChannelType} from "../../@types"

export default function Navbar() {

    const [newChannel, setNewChannel] = useState(false);
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const [channels, setChannels] = useState<ChannelType[]>([]);
    const { channel, updateChannel } = useChat();

    useEffect(() => {
        socket.emit("getChannels", userAuth.id, (res: ChannelType[]) => {
            setChannels(res);
        });
    }, [userAuth, newChannel]);

    function privateClick() {
        updateChannel({...channel,
            currentChannelId: 0,
            currentChannelName: "Private Message",
            currentChannelType: "directMessage"
        });
    }

    function channelClick(id: number) {
        let channelName = channels?.find((chan) => {return chan.id == id})?.name;
        const currentChannelName: string = channelName ? channelName : "";
        updateChannel({
                currentChannelId: id,
                currentChannelName: currentChannelName,
                currentChannelType: "channel"
        });
    }

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
                {channels?.map((chan) => (
                    <ChannelButton
                        name={chan.name}
                        image={
                            chan.image === null
                                ? NoChannelIcon
                                : chan.image
                        }
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
            {newChannel &&
                <NewChannel quitForm={() => setNewChannel(false)} />}
        </div>
    );
}
