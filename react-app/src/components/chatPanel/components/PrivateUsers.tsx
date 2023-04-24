import { useEffect, useState } from "react";
import PrivateUserPlate from "./PrivateUserPlate";
import { useChat } from "context";
import { useSocket } from "hooks";
import { UserType } from "@customTypes";
import "../styles/privateUsers.scss";

export default function PrivateUsers() {
    const { channel } = useChat();
    const [ socket ] = useSocket();
    const [ users, setUsers ] = useState<UserType[]>([]);
    const [ selected, setSelected ] = useState<number>(-1);

    useEffect(() => {
        if (channel.id > 0)
            setSelected(channel.id);
        socket.emit("getPrivateUsers", (users: UserType[]) => {
            setUsers(users);
        });
        socket.on("PrivateUser", (user: UserType) => {
            setUsers((state) => {
                const chanIndex = state.findIndex((c) => c.channelUserId === user.channelUserId);
                const newUsers = [...state];
                chanIndex === -1 ? newUsers.push(user) : (newUsers[chanIndex] = user);
                return newUsers;
            });
        });
        return () => {
            socket.off("PrivateUser");
        };
    }, [socket, channel.id]);

    return (
        <div className="private-users">
            <div className="users">
                {users.map((user, i) => (
                    <PrivateUserPlate
                        user={user}
                        type="privateUser"
                        selected={selected === user.channelId}
                        setSelected={setSelected}
                        key={`${i}`} />
                ))}
            </div>
        </div>
    );
}
