import { useEffect, useState } from "react";
import UserPlate from "components/chatPanel/components/UserPlate";
import { UserType } from "@customTypes";
import { useSocket } from "hooks";
import { useAuth } from "context";
import AddContact from "components/chatPanel/components/AddContact";
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
            .on("friend", (friend: UserType) => {
                setFriends((state) => {
                    const newUsers = [...state];
                    let index = newUsers.findIndex((user) => user.id === friend.id);
                    if (index !== -1) {
                        newUsers[index] = friend;
                    } else {
                        newUsers.push(friend);
                    }
                    return newUsers;
                });
            })
            .on("removeFriend", (friendId: number) => {
                setFriends((state) => [...state.filter((friend) => friend.friendId !== friendId)]);
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
                    <UserPlate user={friend} type="friend" key={`friend-${i}`} />
                ))}
            </div>
            <div className="invitation">
                <AddContact placeholder="Invite friend" type="friend" />
            </div>
        </div>
    );
}

export { Friendbar };
