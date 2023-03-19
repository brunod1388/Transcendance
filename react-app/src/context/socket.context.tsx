import { createContext, useRef, PropsWithChildren, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { useAuth } from "./auth.context";

const SERVER_URL = "http://localhost:3000";

export const SocketContext = createContext<Socket>({} as Socket);

interface Props {}

export function SocketProvider(props: PropsWithChildren<Props>) {
    const socket = useRef<Socket>(io(SERVER_URL, { autoConnect: false }));
    const { userAuth } = useAuth();

    useEffect(() => {
        socket.current.connect();
        socket.current.on("connect", () => {
            axios.post("http://localhost:3000/clients/online", {
                socketId: socket.current.id,
                username: userAuth.username,
                id: userAuth.id,
            });
        });
        return () => {
            socket.current.off("connect");
            // socket.current.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket.current}>
            {props.children}
        </SocketContext.Provider>
    );
}
