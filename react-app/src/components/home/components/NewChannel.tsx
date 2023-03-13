import { useState } from "react";
import AddImage from "../../../assets/images/add-image.png";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";

interface Props {
    quitForm: () => void;
}

export default function NewChannel(props: Props) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [socket] = useSocket();
    const [error, setErrot] = useState(false);
    const { userAuth } = useAuth();

    function handleSubmit(e: any) {
        e.preventDefault();
        const target = e.target;
        const newChannel = {
            name: target.channelName.value,
            type: target.channelType.value,
            password: target.password?.value,
            ownerId: userAuth.id,
        };

        socket.emit("newChannel", newChannel, (res?: any) => {
            console.log(res);
            if (res === `OK`) props.quitForm();
            else setErrot(true);
        });
    }

    return (
        <div className="newChannel_container">
            <div className="form_container">
                <div className="form_wrapper">
                    <div>
                        <span className="title">New Channel</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="channelName"
                            type="text"
                            placeholder="ChannelName"
                        />
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
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        )}
                        {isPrivate && (
                            <input
                                type="password"
                                placeholder="re-type Password"
                            />
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
                        <button>Create Channel</button>
                    </form>
                    <button className="cancel-button" onClick={props.quitForm}>
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
