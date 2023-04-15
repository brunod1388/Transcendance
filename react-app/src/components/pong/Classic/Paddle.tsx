import { CSSProperties, useEffect, useState } from "react";
import { Broadcast, GameConfig, Position } from "@customTypes";
import { useSocket } from "hooks";
import { useInterval } from "hooks";
import "../styles/classic.scss";
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

function Paddle(props:Props) {
    const { host, paddle, onPaddle, config, skin, room } = props;
    const position: CSSProperties = {
        left: paddle.x + (host ? 0 : -config.paddleWidth),
        bottom: paddle.y - config.paddleHeight,
        width: config.paddleWidth,
        height: config.paddleHeight,
    };
    return (
        <div className="paddle" style={{ ...position, ...skin }} />
    );
}

export function YourPaddle(props: Props) {
    return Paddle(props);
}

export function MyPaddle(props: Props) {
    const { paddle, onPaddle, config, room } = props;
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
            paddle.y + paddleSpeed < config.boardHeight
        ) {
            onPaddle({
                ...paddle,
                y: paddle.y + paddleSpeed,
            });
        } else if (
            move === Move.DOWN &&
            paddle.y - paddleSpeed - config.paddleHeight > 0
        ) {
            onPaddle({
                ...paddle,
                y: paddle.y - paddleSpeed,
            });
        }
        setMove(Move.NONE);
    }, [move]);
    // useKeyboard(handler, document);

    useInterval(() => {
        socket.emit(
            "game-broadcast",
            new Broadcast(room, "game-paddle", {
                x: paddle.x,
                y: paddle.y,
            })
        );
    }, 20);
    return Paddle(props);
}
