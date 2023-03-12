import React, { useState } from "react";
import User from "../../chat/components/User";
import { UserType } from "../../../@types";
import AddContact from "../../chat/components/AddContact";
import "../styles/friendbar.scss";

type Props = {};

const usr: UserType = {
    id: 113,
    username: "testUser",
};
export default function Friendbar({}: Props) {
    const [friendsVisible, setFriendsVisible] = useState(false);

    return (
        <div className="friendBar">
            <span className="title">Friends</span>
            <div className="friends">
                {[...Array(20)].map((e, i) => (
                    <User user={usr} isPrivate={true} keyId={`d${i}`} key={i} />
                ))}
            </div>
            <div className="invitation">
                <AddContact placeholder="Invite friend" type="friend" />
            </div>
        </div>
    );
}
