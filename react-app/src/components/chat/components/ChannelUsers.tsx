import { useEffect, useState } from "react";
import UserPlate from "./UserPlate";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import { UserType } from "../../../@types";
import "../styles/channelUsers.scss";
import AddContact from "./AddContact";

export default function ChannelUsers() {
    const { channel, updateChannel } = useChat();
    const [socket] = useSocket();
    const { userAuth } = useAuth();
    const [searchUser, setSearchUser] = useState<UserType>();
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        socket.emit(
            "getChannelUsers",
            { channelId: channel.id },
            (users: UserType[]) => {
                console.log(users)
                setUsers(users);
                const rights = users.find(
                    (user) => user.id === userAuth.id
                )?.rights;
                updateChannel({ ...channel, rights: String(rights) });
            }
        );
        socket
            .on("ChannelUser", (user: UserType) => {
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
            .on("RemoveChannelUser", (channelUserId: number) => {
                setUsers((state) => [
                    ...state.filter(
                        (user) => user.channelUserId !== channelUserId
                    ),
                ]);
            });
        return () => {
            socket.off("ChannelUser").off("RemoveChannelUser");
        };
    }, [socket, channel.id]);

    return (
        <div className="ChannelUsers">
            <div className="search">
                <div className="searchForm">
                    <input type="text" placeholder="type a user" />
                </div>
                {searchUser !== undefined && (
                    <UserPlate user={searchUser} type="channelUser" />
                )}
            </div>
            <div className="users">
                {users.filter((user) => user.rights === "admin").length > 0 && (
                    <span className="title">Admin</span>
                )}
                {users
                    .filter((user) => user.rights === "admin")
                    .map((user, i) => (
                        <UserPlate
                            user={user}
                            key={`admin-${i}`}
                            type="channelUser"
                        />
                    ))}
                {users.filter((usr) => usr.rights === "normal").length > 0 && (
                    <span className="title">Users</span>
                )}
                {users
                    .filter((user) => user.rights === "normal")
                    .map((user, i) => (
                        <UserPlate
                            user={user}
                            key={`user-${i}`}
                            type="channelUser"
                        />
                    ))}
            </div>
            {channel.type === "channel" && (
                <div className="invitation">
                    <AddContact
                        placeholder="Invite contact"
                        type="channelUser"
                    />
                </div>
            )}
        </div>
    );
}
