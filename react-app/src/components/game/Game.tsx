import { useState } from "react";
import { HistoryIcon, MatchIcon, NoUserIcon, RankingIcon } from "../../assets/images";
import GamerBoard from "./components/GamerBoard";
import RankingBoard from "./components/RankingBoard";
import "./styles/game.scss";
import HistoryBoard from "./components/HistoryBoard";
import BoardLayout from "./components/BoardLayout";
import { Matchmaking } from "./components/Matchmaking";
import { LoadGame } from "components/pong/LoadGame";
import { GameEvent } from "components/pong/GameEvent";



enum BoardType {
    ranking = "ranking",
    history = "history",
    match = "match",
    layout = "layout",
}

function Game() {
    const [panel, setPanel] = useState<BoardType>(BoardType.ranking);

    return (
        <div className="game-container">
            <GamerBoard />
            <div className="board-container">
                <div className="board-tabs">
                    <div
                        className={`tab ${
                            panel === BoardType.match ? "selected" : ""
                        }`}
                        onClick={() => setPanel(BoardType.match)}
                    >
                        <img src={MatchIcon} alt="" />
                    </div>
                    <div
                        className={`tab ${
                            panel === BoardType.ranking ? "selected" : ""
                        }`}
                        onClick={() => setPanel(BoardType.ranking)}
                    >
                        <img src={RankingIcon} alt="" />
                    </div>
                    <div                    // TEST PURPOSE
                        className={`tab ${
                            panel === BoardType.history ? "selected" : ""
                        }`}
                        onClick={() => setPanel(BoardType.layout)}
                    >
                        <img src={NoUserIcon} alt="" />
                    </div>
                    <div
                        className={`tab ${
                            panel === BoardType.history ? "selected" : ""
                        }`}
                        onClick={() => setPanel(BoardType.history)}
                    >
                        <img src={HistoryIcon} alt="" />
                    </div>
                </div>
                <div className="board">
                    {panel == "ranking" && (
                        <BoardLayout
                            title="Ranking Board"
                            titleIcon={RankingIcon}
                        >
                            <RankingBoard />
                        </BoardLayout>
                    )}
                    {panel == "history" && (
                        <BoardLayout
                            title="Match History"
                            titleIcon={HistoryIcon}
                        >
                            <HistoryBoard />
                        </BoardLayout>
                    )}
                    {panel == "match" && (
                        <BoardLayout title="Match Making" titleIcon={MatchIcon}>
                            <Matchmaking />
                        </BoardLayout>
                    )}
                    {panel == "layout" && (
                        <BoardLayout title="Layout test" titleIcon={MatchIcon}>
                            TEST
                        </BoardLayout>
                    )}

                </div>
            </div>
        </div>
    );
}

export { Game };
