import { useContext, useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../context/socket-context";

export function useSocket(): [Socket, boolean] {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, [socket]);

    return [socket, isConnected];
}
