import { CSSProperties, PropsWithChildren } from "react";
import { GameConfig, PlayerInfo, Score } from "@customTypes";
import "../styles/playBoard.scss";

interface Props {
    config: GameConfig;
    score: Score;
    user: PlayerInfo;
}

export function Board(props: PropsWithChildren<Props>) {
    const { config, score, user, children } = props;
    function boardStyle(offset: number): CSSProperties {
        return {
            width: config.boardWidth + offset,
            height: config.boardHeight + offset,
        };
    }
    return (
        <div className="play-board-wrapper">
            <span className="title">Ping Pong</span>
            <div
                className="pingpong-container"
                style={boardStyle(50)}
                id={"pongBoard"}
                tabIndex={-1}
            >
                <div className="absolute100">
                    <div className={"score left" + (user.host ? "" : " top580")}>
                        {score.player1}
                    </div>
                    <div className={"score right" + (user.host ? "" : " top580")}>
                        {score.player2}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
