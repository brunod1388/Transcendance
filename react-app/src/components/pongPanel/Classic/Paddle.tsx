import { CSSProperties, useEffect, useState, useRef } from "react";
import { GameConfig, Position } from "@customTypes";
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

function Paddle(props: Props) {
    const { host, paddle, config, skin } = props;
    const position: CSSProperties = {
        left: paddle.x + (host ? 0 : -config.paddleWidth),
        bottom: paddle.y - config.paddleHeight,
        width: config.paddleWidth,
        height: config.paddleHeight,
    };
    return <div className="paddle" style={{ ...position, ...skin }} />;
}

export function YourPaddle(props: Props) {
    return Paddle(props);
}

export function MyPaddle(props: Props) {
    const { paddle, onPaddle, config, room } = props;
    const [socket] = useSocket();
    const [move, setMove] = useState(Move.NONE);
    const paddleSpeed = 20; // <- nombre de pixel du déplacement du paddle
    const moveInterval = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        function handleMoveStart(event: KeyboardEvent) {
            if (event.code === "ArrowUp") {
                setMove(Move.UP);
            } else if (event.code === "ArrowDown") {
                setMove(Move.DOWN);
            }
        }

        function handleMoveEnd(event: KeyboardEvent) {
            if (event.code === "ArrowUp" && move === Move.UP) {
                setMove(Move.NONE);
            } else if (event.code === "ArrowDown" && move === Move.DOWN) {
                setMove(Move.NONE);
            }
        }

        document.addEventListener("keydown", handleMoveStart);
        document.addEventListener("keyup", handleMoveEnd);

        return () => {
            document.removeEventListener("keydown", handleMoveStart);
            document.removeEventListener("keyup", handleMoveEnd);
            clearInterval(moveInterval.current!);
        };
    }, [move]);

    useInterval(() => {
        if (move === Move.UP && paddle.y + paddleSpeed < config.boardHeight) {
            onPaddle({
                ...paddle,
                y: paddle.y + paddleSpeed,
            });
        } else if (move === Move.DOWN && paddle.y - paddleSpeed - config.paddleHeight > 0) {
            onPaddle({
                ...paddle,
                y: paddle.y - paddleSpeed,
            });
        }
    }, 20); // <- loop temps seconde 

    useInterval(() => {
        if (document.hidden === false) socket.emit("game-paddle-classic", { room, paddle });
    }, 20); // adjust as needed - if lag opponent

    return Paddle(props);
}
