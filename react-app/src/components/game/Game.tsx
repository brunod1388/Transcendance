import { useState } from "react";
import { player } from "../../@types/match.types";
import { HistoryIcon, MatchIcon, RankingIcon } from "../../assets/images";
import { useAuth } from "../../context";
import GamerBoard from "./components/GamerBoard";
import RankingBoard from "./components/RankingBoard";
import "./styles/game.scss";
import HistoryBoard from "./components/HistoryBoard";
import MatchBoard from "./components/MatchBoard";
type Props = {};

enum BoardType {
    ranking = "ranking",
    history = "history",
    match = "match",
}
function Game({}: Props) {
    const [panel, setPanel] = useState<BoardType>(BoardType.ranking);

    return (
        <div className="game-container">
            <GamerBoard />
            <div className="board-container">
                <div className="board-tabs">
                    <div
                        className={`tab ${panel === BoardType.ranking ? "selected" : ""}`}
                        onClick={() => setPanel(BoardType.ranking)}
                    >
                        <img src={RankingIcon} alt=""/>
                    </div>
                    <div
                        className={`tab ${panel === BoardType.match ? "selected" : ""}`}
                        onClick={() => setPanel(BoardType.match)}
                    >
                        <img src={MatchIcon} alt=""/>
                    </div>
                    <div
                        className={`tab ${panel === BoardType.history ? "selected" : ""}`}
                        onClick={() => setPanel(BoardType.history)}
                    >
                        <img src={HistoryIcon} alt=""/>
                    </div>
                </div>
                <div className="board">
                    {panel === "history" && <HistoryBoard />}
                    {panel === "ranking" && <RankingBoard />}
                    {panel === "match" && <MatchBoard />}

                </div>

            </div>
        </div>
    );
}

export { Game };
