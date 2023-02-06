import React, { useEffect, useState } from "react";
// import Ball from "./Ball/Ball";
// import {UserPlayer, Player} from "./Player/Player";
// import style from "./Pong.module.css";
import Board from "./Board/Board";
import { socket } from "../../App";
// const FPS = 1000;

interface Position {
    x: number;
    y: number;
}

interface Frame {
    opponent: Position;
    ball: Position;
}

function Game() {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [frame, setFrame] = useState<Frame>({
        opponent: { x: 0, y: 0 },
        ball: { x: 0, y: 0 },
    });

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("frame", (newFrame) => {
            setFrame(newFrame);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
        };
    }, []);
    console.log(`${socket.id} is connected: ${isConnected}`);

    return <Board opponent={frame.opponent} ball={frame.ball} />;
}

export default Game;
