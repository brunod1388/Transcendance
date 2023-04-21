import { useState } from "react";
import AddImage from "assets/images/add-image.png";
import { useSocket } from "hooks";
import { Feature, useAuth, useChat, useFeature } from "context";
import { LockIcon, NoChannelIcon } from "assets/images";
import { ChannelType } from "@customTypes";
import "../styles/newChannel.scss";
interface Props {
    quitForm: () => void;
}

interface ChannelProps {
    channel: ChannelType;
    joinChannel: (channel: ChannelType) => void;
}

// const foundChannels = [
//     { id: 1, name: "channel1", image: NoChannelIcon, type: "channel" },
//     { id: 2, name: "channel2", image: NoChannelIcon, type: "channel" },
//     { id: 3, name: "channel3", image: NoChannelIcon, type: "channel" },
//     { id: 4, name: "channel4", image: NoChannelIcon, type: "channel" },
//     { id: 4, name: "channel4", image: NoChannelIcon, type: "channel" },
//     { id: 4, name: "channel4", image: NoChannelIcon, type: "channel" },
//     { id: 4, name: "channel4", image: NoChannelIcon, type: "channel" },
//     { id: 4, name: "channel4", image: NoChannelIcon, type: "channel" },
//     { id: 4, name: "channel4", image: NoChannelIcon, type: "channel" },
// ];

function ChannelPlate({ channel, joinChannel }: ChannelProps) {
    return (
        <div className="channel">
            <img src={channel.image ? channel.image : NoChannelIcon} alt="channel-image" />
            <span>{channel.name}</span>
            <button onClick={() => joinChannel(channel)}> Join </button>
        </div>
    );
}

export default function NewChannel(props: Props) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [socket] = useSocket();
    const [error, setErrot] = useState(false);
    const { userAuth } = useAuth();
    const [create, setCreate] = useState(false);
    const [foundChannels, setFoundChannels] = useState<ChannelType[]>([]);
    const [channelName, setChannelName] = useState("");
    const { channel, updateChannel } = useChat();
    const { setFeature } = useFeature();
    function handleSubmit(e: any) {
        e.preventDefault();
        const target = e.target;
        const newChannel = {
            name: target.channelName.value,
            type: target.channelType.value,
            password: target.password?.value,
            ownerId: userAuth.id,
        };

        socket.emit("newChannel", { newChannel: newChannel }, (res?: any) => {
            if (res === `OK`) props.quitForm();
            else setErrot(true);
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let isChecked = e.target.checked;
        console.log("isChecked: ", isChecked);
        setCreate(isChecked);
    }

    function joinChannel(channel: ChannelType) {
        console.log("join channel:", channel);
        socket.emit("joinChannel", { channelId: channel.id }, (res?: ChannelType | string) => {
            if (res === undefined)
                return console.log("res is undefined");
            if (typeof(res) === "string")
                return console.log("res: ", res);
            socket.emit("leaveRoom", {
                userid: userAuth.id,
                channelid: channel.id,
            });
            updateChannel({
                id: res.id,
                name: res.name,
                type: "channel",
                image: res.image,
                room: "room-" + res.id,
                rights: "normal"
            })
            setFeature(Feature.Chat);
            socket.emit("joinRoom", { userid: userAuth.id, channelid: res.id });

            props.quitForm();
        });
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const channelName = target.value;
        if (channelName === "")
            return setFoundChannels([]);
        console.log("channelName: ", channelName);
        setChannelName(channelName);
        socket.emit("searchChannel", { channelName: channelName }, (res: ChannelType[]) => {
            setFoundChannels(res);
            console.log("res: ", res)
        });
    }

    return (
        <div className="newChannel-container">
            <div className="form_container">
                <div className="form_wrapper">
                    <div className="createOrJoin">
                        <div className="switch-button">
                            <input
                                className="switch-button-checkbox"
                                type="checkbox"
                                onChange={(e) => handleChange(e)}
                            ></input>
                            <label className="switch-button-label" htmlFor="">
                                <span className="switch-button-label-span">Join</span>
                            </label>
                        </div>
                    </div>
                    <span className="logo">New Channel</span>
                    {create && (
                        <form onSubmit={handleSubmit}>
                            <div className="input_container">
                                <span className="input-title">Channel name</span>
                                <img
                                    className="input_icon channel_icon"
                                    src={NoChannelIcon}
                                    alt=""
                                />
                                <input name="channelName" type="text" placeholder="ChannelName" />
                            </div>
                            {error && <p className="error">Something went wrong!</p>}
                            <select
                                name="channelType"
                                id="channelType"
                                onChange={(e) =>
                                    e.target.value === "protected"
                                        ? setIsPrivate(true)
                                        : setIsPrivate(false)
                                }
                            >
                                <option value="public">public</option>
                                <option value="protected">protected</option>
                            </select>
                            {isPrivate && (
                                <div className="input_container">
                                    <span className="input-title">Password</span>
                                    <img className="input_icon locker" src={LockIcon} alt="" />
                                    <input name="password" type="password" placeholder="password" />
                                </div>
                            )}
                            {isPrivate && (
                                <div className="input_container">
                                    <span className="input-title">Confirm Password</span>
                                    <img className="input_icon locker" src={LockIcon} alt="" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="confirm password"
                                    />
                                </div>
                            )}
                            <input type="file" style={{ display: "none" }} id="fileUrl" />
                            <label htmlFor="file">
                                <img src={AddImage} alt="" />
                                <span>Add a channel image</span>
                            </label>
                            <button className="button-purple">Create Channel</button>
                        </form>
                    )}
                    {!create && (
                        <div className="search">
                            <div className="searchForm">
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder="Type Channel to join"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                            <div className="channel-search">
                                {foundChannels.map((channel) => (
                                    <ChannelPlate channel={channel} joinChannel={joinChannel} />
                                ))}
                            </div>
                        </div>
                    )}
                    <button className="cancel-button button-purple" onClick={props.quitForm}>
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
