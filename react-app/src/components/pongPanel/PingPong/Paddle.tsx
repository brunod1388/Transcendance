import { CSSProperties } from "react";
import { Broadcast, GameConfig, Position } from "@customTypes";
import { useCallback } from "react";
import { useSocket } from "hooks";
import { useInterval } from "hooks";
import { useMouse } from "hooks/useMouse";
import style from "../styles/pingpong.module.scss";
interface MyProps {
    host: boolean;
    myPaddle: Position;
    onMyPaddle: (pos: Position) => void;
    config: GameConfig;
    skin: CSSProperties;
    onMyMovement: (newMove: Position) => void;
    myMovement: Position;
    room: string;
}

export function MyPaddle(props: MyProps) {
    const [socket] = useSocket();

    const handler = useCallback(
        (event: MouseEvent) => {
            const container = document.getElementById(
                "pongBoard"
            ) as HTMLDivElement;
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            let posX = offsetX - props.config.paddleWidth / 2;
            let posY =
                props.config.boardHeight -
                offsetY +
                props.config.paddleHeight / 2;
            if (
                posX > 0 &&
                posX + props.config.paddleWidth < props.config.boardWidth &&
                offsetY > 0 &&
                offsetY - props.config.paddleHeight <
                    props.config.boardHeight &&
                offsetY - props.config.paddleHeight / 2 >
                    props.config.boardHeight / 2
            ) {
                props.onMyPaddle({ x: posX, y: posY });
                props.onMyMovement({ x: event.movementX, y: event.movementY });
            }
        },
        [props.myPaddle]
    );
    useMouse(handler, document.getElementById("pongBoard") as HTMLDivElement);

    useInterval(() => {
        socket.emit(
            "game-broadcast",
            new Broadcast(props.room, "game-paddle", {
                pos: {
                    x: props.myPaddle.x,
                    y: props.myPaddle.y,
                },
                movement: {
                    x: props.myMovement.x,
                    y: props.myMovement.y,
                },
            })
        );
    }, 50);

    const position: CSSProperties = {
        left: props.myPaddle.x,
        bottom: props.myPaddle.y - props.config.paddleHeight,
        width: props.config.paddleWidth,
        height: props.config.paddleHeight,
    };
    return (
        <div className={style.myPaddle} style={{ ...position, ...props.skin }}>
            <div className={style.solid}>
                <div
                    style={{
                        width: props.config.paddleWidth,
                        height: props.config.paddleHeight,
                    }}
                    className={style.surface}
                >
                    <div
                        style={{ top: props.config.paddleHeight, left: 15 }}
                        className={style.handle}
                    />
                </div>
            </div>
        </div>
    );
}

interface YourProps {
    host: boolean;
    yourPaddle: Position;
    onYourPaddle: (pos: Position) => void;
    config: GameConfig;
    skin: CSSProperties;
    room: string;
}

export function YourPaddle(props: YourProps) {
    const position: CSSProperties = {
        left: props.yourPaddle.x + (props.host ? 0 : -props.config.paddleWidth),
        bottom: props.yourPaddle.y - props.config.paddleHeight,
        width: props.config.paddleWidth,
        height: props.config.paddleHeight,
    };
    return (
        <div
            className={style.yourPaddle}
            style={{ ...position, ...props.skin }}
        >
            <div className={style.solid}>
                <div
                    style={{
                        width: props.config.paddleWidth,
                        height: props.config.paddleHeight,
                    }}
                    className={style.surface}
                >
                    <div
                        style={{ top: props.config.paddleHeight, left: 15 }}
                        className={style.handle}
                    />
                </div>
            </div>
        </div>
    );
}
