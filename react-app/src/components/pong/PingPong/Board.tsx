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
    function boardStyle(offset: number): CSSProperties 
    { 
        return {
            width: config.boardWidth + offset,
            height: config.boardHeight + offset,
        }
    };
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
                    {user.host === true && (
                        <>
                            <div className="score left">
                                {score.player1}
                            </div>
                            <div className="score right">
                                {score.player2}
                            </div>
                        </>
                    )}
                    {user.host === false && (
                        <>
                            <div className="score left top580">
                                {score.player1}
                            </div>
                            <div className="score right top580">
                                {score.player2}
                            </div>
                        </>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
