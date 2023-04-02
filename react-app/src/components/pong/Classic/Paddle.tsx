import { CSSProperties, PropsWithChildren } from "react";
import { Position } from "../../../@types";

interface Props {
    host: boolean;
    paddle: Position;
    width: number;
    height: number;
    skin: CSSProperties;
}

interface PropsComponent {
    paddle: Position;
    width: number;
    height: number;
    skin: CSSProperties;
}

export function MyPaddle(props: Props) {
    return (
        <Paddle
            paddle={props.paddle}
            width={props.width}
            height={props.height}
            skin={props.skin}
        />
    );
}

export function YourPaddle(props: Props) {
    return (
        <Paddle
            paddle={props.paddle}
            width={props.width}
            height={props.height}
            skin={props.skin}
        />
    );
}

function Paddle({ paddle, width, height, skin }: PropsComponent) {
    const position: CSSProperties = {
        left: paddle.x - width,
        bottom: paddle.y - height,
    };
    return <div style={{ ...position, ...skin }} />;
}
