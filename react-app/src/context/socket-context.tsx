import { createContext, useRef, PropsWithChildren } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

export const SocketContext = createContext<Socket>({} as Socket);

interface Props {}

export function SocketProvider(props: PropsWithChildren<Props>) {
    const socket = useRef<Socket>(io(SERVER_URL));

    return (
        <SocketContext.Provider value={socket.current}>
            {props.children}
        </SocketContext.Provider>
    );
}
