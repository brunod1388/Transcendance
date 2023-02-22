import React, { useState } from "react";
import AddImage from "../../../assets/images/add-image.png"
type Props = {};

export default function NewChannel({}: Props) {
    const [isPrivate, setIsPrivate] = useState(false);

    function handleSubmit(e: any) {
        // ADD NEW CHANNEL
    }

    return (
        <div className="newChannel_container form_container">
            <div className="form_wrapper">
                <div>
                    <span className="title">New Channel</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="ChannelName" />
                    <select
                        name="channelType"
                        id="channelType"
                        onChange={(e) =>
                            e.target.value == "protected"
                                ? setIsPrivate(true)
                                : setIsPrivate(false)
                        }
                    >
                        <option value="public">public</option>
                        <option value="protected">protected</option>
                    </select>
                    {isPrivate && (
                        <input type="password" placeholder="Password" />
                    )}
                    {isPrivate && (
                        <input type="password" placeholder="re-type Password" />
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
            </div>
        </div>
    );
}
