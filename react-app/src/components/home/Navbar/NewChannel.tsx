import React, { useState } from "react";
import AddImage from "../../../assets/images/add-image.png";
import { useSocket } from "../../../hooks/useSocket";
import { useUser } from "../../../context/test-context";

interface Props {
    quitForm: any;
}

export default function NewChannel(props: Props) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [socket] = useSocket();
    const [isUnique, setIsUnique] = useState(true);
    const user = useUser();

    function handleSubmit(e: any) {
        e.preventDefault();
        socket.emit(
            "newChannel",
            {
                name: e.target[0].value,
                type: e.target[1].value,
                Password: e.target[2].value,
                ownerID: user.user.id,
            },
            (res?: string) => {
                if (res === `OK`) props.quitForm();
                else setIsUnique(false);
                console.log("RESPONSE");
                console.log(res);
            }
        );

        // console.log(`name: ${e.target[0].value}`);
        // console.log(`type: ${e.target[1].value}`);
        // console.log(`password: ${e.target[2].value}`);
        // console.log(`repassword: ${e.target[3].value}`);
        // console.log(`***user id ${user.user.id}`)
        // console.log(`***username ${user.user.userName}`)
        // console.log(`***username ${user.user.email}`)
    }

    return (
        <div className="newChannel_container">
            <div className="form_container">
                <div className="form_wrapper">
                    <div>
                        <span className="title">New Channel</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="ChannelName" />
                        {!isUnique && (
                            <p className="error">Channel Name already exist!</p>
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
                            <input type="password" placeholder="Password" />
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
