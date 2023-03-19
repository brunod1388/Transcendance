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
				<User
                        user={usr}
                        isPrivate={true}
                        keyId={`d${-1000}`}
                        key={-1000}
                    />
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
