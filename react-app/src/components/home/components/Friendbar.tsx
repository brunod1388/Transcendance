import React, { useEffect, useState } from "react";
import User from "../../chat/components/User";
import { UserType } from "../../../@types";
import AddContact from "../../chat/components/AddContact";
import "../styles/friendbar.scss";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";

type Props = {};

const usr: UserType = {
    id: 113,
    username: "testUser",
};

function Friendbar({}: Props) {
    const [friendsVisible, setFriendsVisible] = useState(false);
    const [friends, setFriends] = useState<UserType[]>([]);
    const [socket] = useSocket();
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.emit("getFriends", userAuth.id, (res: any) => {
            console.log(res);
            setFriends(res);
        });
    }, []);
    return (
        <div className="friendBar">
            <span className="title">Friends</span>
            <div className="friends">
                {/* {[...Array(20)].map((e, i) => ( */}
                {friends.map((friend, i) => (
                    <User
                        user={friend}
                        isPrivate={true}
                        keyId={`d${i}`}
                        key={i}
                    />
                ))}
            </div>
            <div className="invitation">
                <AddContact placeholder="Invite friend" type="friend" />
            </div>
        </div>
    );
}

export { Friendbar };
