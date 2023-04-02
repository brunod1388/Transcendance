import { CSSProperties, PropsWithChildren, useEffect } from "react";
import { Position } from "../../../@types";

interface Props {
    host: boolean;
    ball: Position;
    rayon: number;
    skin: CSSProperties;
}

interface PropsPhysics {
    host: boolean;
}

interface PropsComponent {
    ball: Position;
    rayon: number;
    skin: CSSProperties;
}

export function Ball(props: Props) {
    return (
        <BallPhysics host={props.host}>
            <BallComponent
                ball={props.ball}
                rayon={props.rayon}
                skin={props.skin}
            />
        </BallPhysics>
    );
}

function BallPhysics(props: PropsWithChildren<PropsPhysics>) {
    return <>{props.children}</>;
}

function BallComponent({ ball, rayon, skin }: PropsComponent) {
    const position: CSSProperties = {
        left: ball.x - rayon,
        bottom: ball.y - rayon,
    };

    return <div style={{ ...position, ...skin }} />;
}
