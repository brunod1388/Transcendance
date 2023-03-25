import { useEffect, useState } from "react";
import User from "../../chat/components/User";
import { UserType } from "../../../@types";
import AddContact from "../../chat/components/AddContact";
import "../styles/friendbar.scss";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";

const usr: UserType = {
    id: 113,
    username: "testUser",
};

function Friendbar() {
    const [friends, setFriends] = useState<UserType[]>([]);
    const [socket] = useSocket();
    const { userAuth } = useAuth();
    const [selected, setSelected] = useState("");

    useEffect(() => {
        socket.emit("getFriends", userAuth.id, (res: UserType[]) => {
            setFriends(res);
        });
        socket.on("friend", (friend) => {
            setFriends((state) => [...state, friend]);
        });
        socket.on("removeFriend", (friendId: number) => {
            setFriends((state) =>
                state.filter((friend) => friend.id !== friendId)
            );
        });
        return () => {
            socket.off("friend");
            socket.off("removeFriend");
        };
    }, [socket]);

    return (
        <div className="friendBar">
            <span className="title">Friends</span>
            <div className="friends">
                <User user={usr} type="friend" key={`friend-${-100}`} />
                {friends.map((friend, i) => (
                    <User user={friend} type="friend" key={`friend-${i}`} />
                ))}
            </div>
            <div className="invitation">
                <AddContact placeholder="Invite friend" type="friend" />
            </div>
        </div>
    );
}

export { Friendbar };
