import { CSSProperties, PropsWithChildren } from "react";
import style from "./pong.module.scss";
import { GameConfig, Score } from "../../../@types";

interface Props {
    config: GameConfig;
    score: Score;
}

export function Board(props: PropsWithChildren<Props>) {
    const boardStyle: CSSProperties = {
        width: props.config.boardWidth,
        height: props.config.boardHeight,
    };
    return (
        <>
            <div style={boardStyle} id={"pongBoard"} className={style.container} tabIndex={-1}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                    }}
                >
					<div className={style.score} id={style["left"]}>
                        {props.score.player1}
                    </div>
                    <div className={style.score} id={style["right"]}>
                        {props.score.player2}
                    </div>
                    

                    {props.children}
                </div>
            </div>
        </>
    );
}
