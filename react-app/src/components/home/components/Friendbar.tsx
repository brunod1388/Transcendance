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
        socket.emit("getFriends", userAuth.id, (res: any) => {
            console.log(res);
            setFriends(res);
        });
    }, []);
    return (
        <div className="friendBar">
            <span className="title">Friends</span>
            <div className="friends">
                {friends.map((friend, i) => (
                    <User
                        user={friend}
                        isPrivate={true}
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
