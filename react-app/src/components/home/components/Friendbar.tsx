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
            console.log(res);
            setFriends(res);
        });
        socket.on("friends", (friend) => {
            setFriends((state) => [...state, friend])
    })
    }, []);

    return (
        <div className="friendBar">
            <span className="title">Friends</span>
            <div className="friends">
                {friends.map((friend, i) => (
                    <User
                        user={friend}
                        type="friend"
                        key={`friend-${i}`}
                        selected={`friend-${i}` === selected}
                        onClick={() =>
                            setSelected(
                                selected === `friend-${i}` ? "" : `friend-${i}`
                            )
                        }
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
