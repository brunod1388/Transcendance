import { CSSProperties, useEffect, useState } from "react";
import { Broadcast, GameConfig, Position } from "@customTypes";
import { useSocket } from "hooks";
import { useInterval } from "hooks";
import style from "./pong.module.scss";
interface Props {
    host: boolean;
    paddle: Position;
    onPaddle: (pos: Position) => void;
    config: GameConfig;
    skin: CSSProperties;
    room: string;
}

enum Move {
    NONE,
    UP,
    DOWN,
}

export function MyPaddle(props: Props) {
    const [socket] = useSocket();
    const [move, setMove] = useState(Move.NONE);
    const paddleSpeed = 10; // adjust as needed

    useEffect(() => {
        function handleMoveStart(event: KeyboardEvent) {
            if (event.code === "ArrowUp") {
                setMove(Move.UP);
            } else if (event.code === "ArrowDown") {
                setMove(Move.DOWN);
            }
        }

        // function handleMoveEnd(event: KeyboardEvent) {
        //     if (event.code === "ArrowUp") {
        //         setMove(Move.NONE);
        //     } else if (event.code === "ArrowDown") {
        //         setMove(Move.NONE);
        //     }
        // }

        document.addEventListener("keydown", handleMoveStart);
        // document.addEventListener("keyup", handleMoveEnd);

        return () => {
            document.removeEventListener("keydown", handleMoveStart);
            // document.removeEventListener("keyup", handleMoveEnd);
        };
    }, []);

    useEffect(() => {
        if (
            move === Move.UP &&
            props.paddle.y + paddleSpeed < props.config.boardHeight
        ) {
            props.onPaddle({
                ...props.paddle,
                y: props.paddle.y + paddleSpeed,
            });
        } else if (
            move === Move.DOWN &&
            props.paddle.y - paddleSpeed - props.config.paddleHeight > 0
        ) {
            props.onPaddle({
                ...props.paddle,
                y: props.paddle.y - paddleSpeed,
            });
        }
        setMove(Move.NONE);
    }, [move]);
    // useKeyboard(handler, document);

    useInterval(() => {
        socket.emit(
            "game-broadcast",
            new Broadcast(props.room, "game-paddle", {
                x: props.paddle.x,
                y: props.paddle.y,
            })
        );
    }, 20);

    const position: CSSProperties = {
        left: props.paddle.x + (props.host ? 0 : -props.config.paddleWidth),
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
        left: props.paddle.x + (props.host ? 0 : -props.config.paddleWidth),
        bottom: props.paddle.y - props.config.paddleHeight,
        width: props.config.paddleWidth,
        height: props.config.paddleHeight,
    };
    return (
        <div className={style.paddle} style={{ ...position, ...props.skin }} />
    );
}
