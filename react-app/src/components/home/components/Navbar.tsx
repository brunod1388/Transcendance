import { useEffect } from "react";
import NewChannel from "./NewChannel";
import MenuButton from "./MenuButton";
import { useState } from "react";
import {
    ChatIcon,
    AddChannelIcon,
    NoChannelIcon,
    PlayIcon,
} from "../../../assets/images";
import {
    useAuth,
    useChat,
    Feature,
    useFeature,
    ChannelDetailsType,
    defaultChannel,
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
        socket.emit(
            "getChannels",
            { userid: userAuth.id, isPending: false },
            (chans: ChannelType[]) => {
                if (channel.id !== 0 && chans.length != channels.length) {
                    setFeature(Feature.None);
                    updateChannel(defaultChannel);
                }
                setChannels(chans);
            }
        );
        socket.on("Channel", (chan: ChannelType) => {
            const chanIndex = channels.findIndex((c) => c.id === chan.id);
            if (chanIndex !== -1) {
                channels[chanIndex] = chan;
                setChannels([...channels]);
                return;
            }
            setChannels((state) => [...state, chan]);
        });
        return () => {
            socket.off("Channel");
        };
    }, [socket, channels, channel.id]);

    function joinRoom(channel: ChannelDetailsType) {
        socket.emit("joinRoom", { userid: userAuth.id, channelid: channel.id });
    }

    function leaveRoom() {
        socket.emit("leaveRoom", {
            userid: userAuth.id,
            channelid: channel.id,
        });
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
            rights: "normal",
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
            <MenuButton
                filter={true}
                name="Play Pong"
                image={PlayIcon}
                isChannel={false}
                onClick={() => setFeature(Feature.Game)}
            />
            <MenuButton
                filter={true}
                name="Private Message"
                image={ChatIcon}
                isChannel={false}
                onClick={privateClick}
            />
            <div className="channels-container">
                <div className="channel-wrapper">
                    {channels?.map((chan, i) => (
                        <MenuButton
                            name={chan.name}
                            image={
                                chan.image === null ? NoChannelIcon : chan.image
                            }
                            onClick={() => {
                                channelClick(chan.id);
                            }}
                            key={i}
                        />
                    ))}
                    <h1 className="channel-title">Channels</h1>
                </div>
            </div>
            <MenuButton
                filter={true}
                name="Add Channel"
                isChannel={false}
                image={AddChannelIcon}
                onClick={addClick}
            />
            {newChannel && <NewChannel quitForm={() => setNewChannel(false)} />}
        </div>
    );
}

export { Navbar };
