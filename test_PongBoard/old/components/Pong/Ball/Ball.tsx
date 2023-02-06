import React from "react";
import style from "../Pong.module.css";

interface BallPosition {
    x: number;
    y: number;
}

function Ball(props: BallPosition) {
    const position: React.CSSProperties = {
        left: props.x,
        bottom: props.y,
    };

    return <div className={style.ball} style={position}></div>;
}

export default Ball;
