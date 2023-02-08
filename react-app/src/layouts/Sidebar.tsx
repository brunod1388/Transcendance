import { style } from "./index";
import { useEffect } from "react";

interface User {
    name: string;
    id: number;
}

const testUsers: User[] = [
    { id: 1, name: "kikou1" },
    { id: 2, name: "kikou2" },
    { id: 3, name: "kikou3" },
    { id: 4, name: "kikou4" },
];

export function Sidebar() {
    const roomUsers: User[] = testUsers;

    // const [roomUsers, setRoomUsers] = useState([]);
    useEffect(() => {
        console.log("useEffect ****");
        // roomUsers.push(testUsers[2]);
        // socket.on('roomUsers', (data) => {
        //   console.log(data);
        //   setRoomUsers(data);
    });
    return (
        // to do
        <div className={style.Sidebar_Container}>
            {roomUsers.map((user, index) => (
                <div key={index} className={style.Sidebar_Header}>
                    {user.name}
                </div>
            ))}
        </div>
    );
}