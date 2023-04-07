import { CSSProperties, useState } from "react";
import { Broadcast, GameConfig, Position } from "../../../@types";
import { useCallback } from "react";
import { useKeyboard, useSocket } from "../../../hooks";
import { useInterval } from "../../../hooks";
import style from "./pong.module.scss";
interface Props {
    host: boolean;
    paddle: Position;
    onPaddle: (pos: Position) => void;
    config: GameConfig;
    skin: CSSProperties;
    room: string;
}

export function MyPaddle(props: Props) {
    const [socket] = useSocket();

    const moveUp = () => {
        if (props.paddle.y + 10 < props.config.boardHeight) {
            props.onPaddle({ ...props.paddle, y: props.paddle.y + 10 });
        }
    };

    const moveDown = () => {
        if (props.paddle.y - 10 - props.config.paddleHeight > 0) {
            props.onPaddle({ ...props.paddle, y: props.paddle.y - 10 });
        }
    };

    const handler = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") moveUp();
            else if (event.key === "ArrowDown") moveDown();
        },
        [props.paddle]
    );
    useKeyboard(handler, document);

    useInterval(() => {
        socket.emit(
            "game-broadcast",
            new Broadcast(props.room, "game-paddle", {
                x: props.paddle.x,
                y: props.paddle.y,
            })
        );
    }, 50);

    const position: CSSProperties = {
        left: props.paddle.x + (props.host? 0: -props.config.paddleWidth),
        bottom: props.paddle.y - props.config.paddleHeight,
        width: props.config.paddleWidth,
        height: props.config.paddleHeight,
    };
    return (
        <div className={style.paddle} style={{ ...position, ...props.skin }} />
    );
}

export function YourPaddle(props: Props) {
    const position: CSSProperties = {
        left: props.paddle.x + (props.host? 0 : -props.config.paddleWidth),
        bottom: props.paddle.y - props.config.paddleHeight,
        width: props.config.paddleWidth,
        height: props.config.paddleHeight,
    };
    return (
        <div className={style.paddle} style={{ ...position, ...props.skin }} />
    );
}
