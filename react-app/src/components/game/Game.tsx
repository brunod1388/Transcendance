import { useState } from "react";
import { HistoryIcon, MatchIcon, RankingIcon } from "../../assets/images";
import GamerBoard from "./components/GamerBoard";
import RankingBoard from "./components/RankingBoard";
import "./styles/game.scss";
import HistoryBoard from "./components/HistoryBoard";
import BoardLayout from "./components/BoardLayout";
import { Matchmaking } from "./components/Matchmaking";
type Props = {};

enum BoardType {
    ranking = "ranking",
    history = "history",
    match = "match",
    layout = "layout",
}

function Game({}: Props) {
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
                </div>
            </div>
        </div>
    );
}

export { Game };
