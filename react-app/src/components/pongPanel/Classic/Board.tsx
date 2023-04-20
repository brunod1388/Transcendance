import { CSSProperties, PropsWithChildren } from "react";
import { GameConfig, Score } from "@customTypes";
import "../styles/playBoard.scss";

interface Props {
    config: GameConfig;
    score: Score;
}

export function Board(props: PropsWithChildren<Props>) {
    const { config, score, children } = props;
    function boardStyle(offset: number): CSSProperties {
        return {
            width: config.boardWidth + offset,
            height: config.boardHeight + offset,
        };
    }
    return (
        <div className="play-board-wrapper">
            <span className="title">Classic Pong</span>
            <div className="play-board" style={boardStyle(50)}>
                <div style={boardStyle(0)} className="classic-container" tabIndex={-1}>
                    <div className="absolute100">
                        <div className="score left">{score.player1}</div>
                        <div className="score right">{score.player2}</div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
