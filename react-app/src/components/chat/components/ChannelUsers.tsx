import { useEffect, useState } from "react";
import User from "./User";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import { UserType } from "../../../@types";
import "../styles/channelUsers.scss";
import AddContact from "./AddContact";

export default function ChannelUsers() {
    const { channel } = useChat();
    const [socket] = useSocket();
    const { userAuth } = useAuth();
    const [searchUser, setSearchUser] = useState<UserType>();
    const [admins, setAdmins] = useState<UserType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [selected, setSelected] = useState(""); //use userId when emplemented

    useEffect(() => {
        socket.emit(
            "getChannelUsers",
            { channelId: channel.id },
            (users: UserType[]) => {
                setAdmins(users.filter((usr) => usr.rights === "admin"));
                setUsers(users.filter((usr) => usr.rights === "normal"));
            }
        );
        setSelected("")
        socket.on("ChannelUsers", (users: UserType[]) => {
            // setUsers(users);
            console.log(users);
        });
        return () => {
            socket.off("ChannelUsers");
        };
    }, [channel.id, socket]);

    function updateSelected(prefix: string, id: number) {
        const key = prefix + `-${id}`;
        setSelected(selected === key ? "" : key);
    }
    return (
        <div className="ChannelUsers">
            <div className="search">
                <div className="searchForm">
                    <input type="text" placeholder="type a user" />
                </div>
                {searchUser !== undefined && (
                    <User
                        user={searchUser}
                        onClick={() => updateSelected("search", 0)}
                        selected={selected === "search-0"}
                    />
                )}
            </div>
            <div className="users">
                {admins.length > 0 && <span className="title">Admin</span>}
                {admins.map((user, i) => (
                    <User
                        user={user}
                        isPrivate={false}
                        key={`admin-${i}`}
                        onClick={() => updateSelected("admin", i)}
                        selected={selected === `admin-${i}`}
                    />
                ))}
                {users.length > 0 && <span className="title">Users</span>}
                {users.map((user, i) => (
                    <User
                        user={user}
                        isPrivate={false}
                        key={`user-${i}`}
                        onClick={() => updateSelected("user", i)}
                        selected={selected === `user-${i}`}
                    />
                ))}
            </div>
            <div className="invitation">
                <AddContact placeholder="Invite contact" type="channelUser" />
            </div>
        </div>
    );
}
