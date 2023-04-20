import { createContext, useRef, PropsWithChildren, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

//const SERVER_URL = "http://localhost:3000";
const SERVER_URL = String(process.env.REACT_APP_BACKEND_URL);

export const SocketContext = createContext<Socket>({} as Socket);

export function SocketProvider(props: PropsWithChildren) {
    //const token = Cookies.get("JWTtoken");
    //console.log("SOCKET CONTEXT jwt: ", token);
    const socket = useRef<Socket>(
        io(SERVER_URL, {
            autoConnect: false,
            auth: {
                token: String(Cookies.get("JWTtoken")),
            },
        })
    );

    useEffect(() => {
        const actualSocket = socket.current;
        actualSocket.connect();
        return () => {
            actualSocket.disconnect();
        };
    }, [socket]);

    socket.current.on("users_online", (data: number[]) => {
        console.log("User ids currently online: ", data);
    });

    // useEffect(() => {
    //     socket.current.connect();
    //     socket.current.on("connect", () => {
    //         axios.post("http://localhost:3000/clients/online", {
    //             socketId: socket.current.id,
    //             username: userAuth.username,
    //             id: userAuth.id,
    //         });
    //     });
    //     return () => {
    //         socket.current.off("connect");
    //         // socket.current.disconnect();
    //     };
    // }, []);

    return <SocketContext.Provider value={socket.current}>{props.children}</SocketContext.Provider>;
}
