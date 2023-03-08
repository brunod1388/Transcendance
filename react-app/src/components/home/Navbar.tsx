import React, { useEffect } from "react";
import NewChannel from "./Navbar/NewChannel";
import ChannelButton from "./Navbar/ChannelButton";
import { useState } from "react";
import { ChatIcon, AddChannelIcon, NoChannelIcon } from "../../assets/images";
import "./Navbar/navbar.scss";
import { useAuth, useChat } from "../../context";
import { useSocket } from "../../hooks";

interface ChannelType {
    id: number;
    name: string;
    image?: any;
}

export default function Navbar() {
    const channelss: any[] = [
        { name: "channel1", image: NoChannelIcon, id: 1 },
        { name: "channel2", image: NoChannelIcon, id: 2 },
        { name: "channel3", image: NoChannelIcon, id: 3 },
    ];
    const [newChannel, setNewChannel] = useState(false);
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const [channels, setChannels] = useState<ChannelType[]>();
    const { chat, updateChat } = useChat();

    useEffect(() => {
        console.log(userAuth);
        console.log(userAuth.id);
        socket.emit("getChannels", userAuth.id, (res: ChannelType[]) => {
            console.log(res);
            setChannels(res);
        });
    }, []);

    function privateClick() {
        // updateChat((prev) => ({
        //     ...channels,
        //     currentChannelType: "directMessage",
        // }));
    }

    function channelClick(id: number) {
        // updateChat((prev) => ({
        //     ...channels,
        //     currentChannelId: id,
        //     currentChannelType: "channel",
        // }));
        // socket.emit("joinRoom", userAuth.id, (res: string) => {
        //     console.log(res);
        // })
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
                {channels?.map((channel) => (
                    <ChannelButton
                        name={channel.name}
                        image={
                            channel.image === null
                                ? NoChannelIcon
                                : channel.image
                        }
                        onClick={() => {
                            channelClick(channel.id);
                        }}
                        key={channel.id}
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
