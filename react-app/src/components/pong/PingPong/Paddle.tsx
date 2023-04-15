import { CSSProperties } from "react";
import { Broadcast, GameConfig, Position } from "@customTypes";
import { useCallback } from "react";
import { useSocket } from "hooks";
import { useInterval } from "hooks";
import style from "./pong.module.scss";
import { useMouse } from "hooks/useMouse";

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
    const { host, myPaddle, onMyPaddle, config, skin, room, myMovement, onMyMovement } = props;
    const [socket] = useSocket();
    const handler = useCallback(
        (event: MouseEvent) => {
            const container = document.getElementById(
                "pongBoard"
            ) as HTMLDivElement;
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            let posX = offsetX - config.paddleWidth / 2;
            let posY =
                config.boardHeight -
                offsetY +
                config.paddleHeight / 2;
            if (
                posX > 0 &&
                posX + config.paddleWidth < config.boardWidth &&
                offsetY > 0 &&
                offsetY - config.paddleHeight <
                    config.boardHeight &&
                offsetY - config.paddleHeight / 2 >
                    config.boardHeight / 2
            ) {
                onMyPaddle({ x: posX, y: posY });
                onMyMovement({ x: event.movementX, y: event.movementY });
            }
        },
        [myPaddle]
    );
    useMouse(handler, document.getElementById("pongBoard") as HTMLDivElement);

    useInterval(() => {
        socket.emit(
            "game-broadcast",
            new Broadcast(room, "game-paddle", {
                pos: {
                    x: myPaddle.x,
                    y: myPaddle.y,
                },
                movement: {
                    x: myMovement.x,
                    y: myMovement.y,
                },
            })
        );
    }, 50);

    const position: CSSProperties = {
        left: myPaddle.x,
        bottom: myPaddle.y - config.paddleHeight,
        width: config.paddleWidth,
        height: config.paddleHeight,
    };
    return (
        <div className={style.myPaddle} style={{ ...position, ...skin }}>
            <div className={style.solid}>
                <div
                    style={{
                        width: config.paddleWidth,
                        height: config.paddleHeight,
                    }}
                    className={style.surface}
                >
                    <div
                        style={{ top: config.paddleHeight, left: 15 }}
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
    const { host, yourPaddle, onYourPaddle, config, skin, room } = props;
    const position: CSSProperties = {
        left: yourPaddle.x + (host ? 0 : -config.paddleWidth),
        bottom: yourPaddle.y - config.paddleHeight,
        width: config.paddleWidth,
        height: config.paddleHeight,
    };
    return (
        <div
            className={style.yourPaddle}
            style={{ ...position, ...skin }}
        >
            <div className={style.solid}>
                <div
                    style={{
                        width: config.paddleWidth,
                        height: config.paddleHeight,
                    }}
                    className={style.surface}
                >
                    <div
                        style={{ top: config.paddleHeight, left: 15 }}
                        className={style.handle}
                    />
                </div>
            </div>
        </div>
    );
}
