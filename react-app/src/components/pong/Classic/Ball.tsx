import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { GameConfig, Position } from "../../../@types";
import { useInterval, useSocket } from "../../../hooks";
import { Score } from "../../../@types";
import style from "./pong.module.scss";
import { Ball as BallType } from "../../../@types";

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

    return <div className={style.ball} style={{ ...position, ...skin }} />;
}
