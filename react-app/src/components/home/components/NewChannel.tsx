import { useState } from "react";
import AddImage from "../../../assets/images/add-image.png";
import { useSocket } from "../../../hooks";
import { useAuth, useChat } from "../../../context";
import { ChannelType } from "../../../@types";
import { Lock, NoChannelIcon, User } from "../../../assets/images";

interface Props {
    quitForm: () => void;
}

export default function NewChannel(props: Props) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [socket] = useSocket();
    const [error, setErrot] = useState(false);
    const { userAuth } = useAuth();
    const { channel, updateChannel } = useChat();

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

    return (
        <div className="newChannel_container">
            <div className="form_container">
                <div className="form_wrapper">
                    <span className="logo">New Channel</span>
                    <form onSubmit={handleSubmit}>
                        <div className="input_container">
                            <span className="input-title">Channel name</span>
                            <img
                                className="input_icon channel_icon"
                                src={NoChannelIcon}
                                alt=""
                            />
                            <input
                                name="channelName"
                                type="text"
                                placeholder="ChannelName"
                            />
                        </div>
                        {error && (
                            <p className="error">Something went wrong!</p>
                        )}
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
                                <img
                                    className="input_icon locker"
                                    src={Lock}
                                    alt=""
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                />
                            </div>
                        )}
                        {isPrivate && (
                            <div className="input_container">
                                <span className="input-title">
                                    Confirm Password
                                </span>
                                <img
                                    className="input_icon locker"
                                    src={Lock}
                                    alt=""
                                />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="confirm password"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="fileUrl"
                        />
                        <label htmlFor="file">
                            <img src={AddImage} alt="" />
                            <span>Add a channel image</span>
                        </label>
                        <button className="button-purple">
                            Create Channel
                        </button>
                    </form>
                    <button
                        className="cancel-button button-purple"
                        onClick={props.quitForm}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
