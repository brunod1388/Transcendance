import { CSSProperties, PropsWithChildren } from "react";
import { GameConfig, Score } from "@customTypes";
import style from "./pong.module.scss";
import "../styles/playBoard.scss";
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
        <div className="play-board-wrapper">
            <span className="title">Classic Pong</span>
            <div
                className="play-board"
                style={{
                    width: (props.config.boardWidth + 50) + "px",
                    height: (props.config.boardHeight + 50) + "px"
                }}
                >
                <div
                    style={boardStyle}
                    className={style.container}
                    tabIndex={-1}
                    >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                        }}
                    >
                        <div className="score" id={style["left"]}>
                            {props.score.player1}
                        </div>
                        <div className="score" id={style["right"]}>
                            {props.score.player2}
                        </div>

                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
