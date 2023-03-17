import { useEffect, useState } from "react";
import User from "./User";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import { UserType } from "../../../@types";
import "../styles/sidebar.scss";
import AddContact from "./AddContact";

export default function Sidebar() {
    const { channel } = useChat();
    const [socket] = useSocket();
    const [users, setUsers] = useState<UserType[]>([]);
    const { userAuth } = useAuth();
    const [searchUser, setSearchUser] = useState<UserType>();

    useEffect(() => {
        socket.on("ChannelUsers", (users) => {
            setUsers(users);
        });
        return () => { socket.off("ChannelUsers"); };
    }, [socket]);

    // useEffect(() => {
    //     if (channel.type === "channel")
    //         socket.emit(
    //             "getChannelUsers",
    //             channel.id,
    //             (usersReceived: UserType[]) => {
    //                 setUsers(usersReceived);
    //             }
    //         );
    //     else
    //         socket.emit(
    //             "getPrivateUsers",
    //             userAuth.id,
    //             (usersReceived: UserType[]) => {
    //                 setUsers(usersReceived);
    //             }
    //         );

    //     return () => {
    //         socket.emit("leaveRoom", channel.room);
    //     };
    // }, [channel]);

    return (
        <div className="SideBar">
            <div className="search">
                <div className="searchForm">
                    <input type="text" placeholder="type a user" />
                </div>
                {searchUser !== undefined && (
                    <User user={searchUser} keyId="searchUser" />
                )}
            </div>
            <div className="users">
                {users.map((user, i) => (
                    <User
                        user={user}
                        isPrivate={channel.type === "directMessage"}
                        keyId={`${user.id}`}
                        key={i}
                    />
                ))}
            </div>
            <div className="invitation">
                <AddContact placeholder="Invite contact" type="channelUser" />
            </div>
        </div>
    );
}
