import { useEffect, useState } from "react";
import PrivateUserPlate from "./PrivateUserPlate";
import { useChat } from "context";
import { useSocket } from "hooks";
import { UserType } from "@customTypes";
import "../styles/privateUsers.scss";

export default function PrivateUsers() {
    const { channel } = useChat();
    const [socket] = useSocket();
    const [searchUser, setSearchUser] = useState<UserType>();
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        socket.emit("getPrivateUsers", (users: UserType[]) => {
            console.log("PRIVATEUSERS: ", users);
            setUsers(users);
        });
        socket.on("PrivateUser", (user: UserType) => {
            setUsers((state) => {
                const chanIndex = state.findIndex(
                    (c) => c.channelUserId === user.channelUserId
                );
                const newUsers = [...state];
                chanIndex === -1
                    ? newUsers.push(user)
                    : (newUsers[chanIndex] = user);
                return newUsers;
            });
        });
        return () => {
            socket.off("PrivateUser");
        };
    }, [socket, channel.id]);

    return (
        <div className="private-users">
            <div className="search">
                <div className="searchForm">
                    <input type="text" placeholder="type a user" />
                </div>
                {searchUser !== undefined && (
                    <PrivateUserPlate user={searchUser} type="channelUser" />
                )}
            </div>
            <div className="users">
                {users.map((user, i) => (
                    <PrivateUserPlate
                        user={user}
                        key={`admin-${i}`}
                        type="privateUser"
                    />
                ))}
            </div>
        </div>
    );
}
