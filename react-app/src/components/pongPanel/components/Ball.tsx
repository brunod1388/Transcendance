import { CSSProperties } from "react";
import { GameConfig } from "@customTypes";
import { Ball as BallType } from "@customTypes";
import "../styles/ball.scss";

// interface Props {
//     host: boolean;
//     ball: BallType;
//     rayon: number;
//     paddle1: Position;
//     paddle2: Position;
//     onBall: (pos: Position) => void;
//     skin: CSSProperties;
//     score: Score;
//     config: GameConfig;
// }

// interface PropsPhysics {
//     score: Score;
//     config: GameConfig;
//     host: boolean;
//     paddle1: Position;
//     paddle2: Position;
//     skin: CSSProperties;
// }

interface PropsComponent {
    ball: BallType;
    config: GameConfig;
    skin: CSSProperties;
}

export function BallComponent({ ball, config, skin }: PropsComponent) {
    const position: CSSProperties = {
        left: ball.pos.x - config.ballRayon,
        bottom: ball.pos.y - config.ballRayon,
        width: config.ballRayon * 2,
        height: config.ballRayon * 2,
    };

    return <div className="ball" style={{ ...position, ...skin }} />;
}
