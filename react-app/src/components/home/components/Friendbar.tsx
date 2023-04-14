import { useEffect, useState } from "react";
import UserPlate from "components/chat/components/UserPlate";
import { UserType } from "@customTypes";
import { useSocket } from "hooks";
import { useAuth } from "context";
import AddContact from "components/chat/components/AddContact";
import "../styles/friendbar.scss";

function Friendbar() {
    const [friends, setFriends] = useState<UserType[]>([]);
    const [socket] = useSocket();
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.emit("getFriends", userAuth.id, (res: UserType[]) => {
            setFriends(res);
        });
        socket
            .on("friend", (friend) => {
                setFriends((state) => [...state, friend]);
            })
            .on("removeFriend", (friendId: number) => {
                setFriends((state) => [
                    ...state.filter((friend) => friend.friendId !== friendId),
                ]);
            });
        return () => {
            socket.off("friend").off("removeFriend");
        };
    }, [socket]);

    return (
        <div className="friendBar">
            <span className="title">Friends</span>
            <div className="friends">
                {friends.map((friend, i) => (
                    <UserPlate
                        user={friend}
                        type="friend"
                        key={`friend-${i}`}
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
