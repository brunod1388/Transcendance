import { useEffect, useState } from "react";
import PrivateUserPlate from "./PrivateUserPlate";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import { UserType } from "../../../@types";
import "../styles/privateUsers.scss";
import AddContact from "./AddContact";

export default function PrivateUsers() {
    const { channel, updateChannel } = useChat();
    const [socket] = useSocket();
    const { userAuth } = useAuth();
    const [searchUser, setSearchUser] = useState<UserType>();
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        socket.emit(
            "getPrivateUsers",
            { channelId: channel.id },
            (users: UserType[]) => {
                setUsers(users);
                const rights = users.find(
                    (user) => user.id === userAuth.id
                )?.rights;
                updateChannel({ ...channel, rights: String(rights) });
            }
        );
        socket
            .on("PrivateUser", (user: UserType) => {
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
            })
            .on("RemovePrivateUser", (channelUserId: number) => {
                setUsers((state) => [
                    ...state.filter(
                        (user) => user.channelUserId !== channelUserId
                    ),
                ]);
            });
        return () => {
            socket.off("PrivateUser").off("RemovePrivateUser");
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
                {users.filter((user) => user.rights === "admin").length > 0 && (
                    <span className="title">Admin</span>
                )}
                {users.map((user, i) => (
                    <PrivateUserPlate
                        user={user}
                        key={`admin-${i}`}
                        type="channelUser"
                    />
                ))}
            </div>
        </div>
    );
}
