import React, { PropsWithChildren, useState, KeyboardEvent } from "react";
import Ball from "../Ball/Ball";
import Player from "../Player/Player";
import style from "../Pong.module.css";
import { socket } from "../../../../App";

interface Position {
    x: number;
    y: number;
}

interface Props {
    opponent: Position;
    ball: Position;
}

function sendPlayerPosition(playerY: number) {
    console.log(`message sent: ${playerY}`);
    socket.emit("player", playerY);
}

function Board(props: PropsWithChildren<Props>) {
    const [playerY, setPlayerY] = useState(0);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            setPlayerY(playerY + 10);
        } else if (e.key === "ArrowDown") {
            setPlayerY(playerY - 10);
        }
        sendPlayerPosition(playerY);
        console.log(`key pressed: ${e.key}`);
    };

    return (
        <div
            className={style.container}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
        >
            <div style={{ backgroundColor: "white" }}>{socket.id} </div>
            <Player x={props.opponent.x} y={props.opponent.y} />
            <Player x={125} y={playerY} />
            <Ball x={props.ball.x} y={props.ball.y} />
        </div>
    );
}
export default Board;
