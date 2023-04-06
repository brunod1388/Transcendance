import { useState } from "react";
import { player } from "../../@types/match.types";
import { History, Ranking } from "../../assets/images";
import { useAuth } from "../../context";
import GamerBoard from "./components/GamerBoard";
import RankingBoard from "./components/RankingBoard";
import "./styles/game.scss";
import HistoryBoard from "./components/HistoryBoard";
type Props = {};

enum BoardType {
    ranking = "ranking",
    history = "history",
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
                        <img src={Ranking} alt=""/>
                    </div>
                    <div
                        className={`tab ${panel === BoardType.history ? "selected" : ""}`}
                        onClick={() => setPanel(BoardType.history)}
                    >
                        <img src={History} alt=""/>
                    </div>
                </div>
                <div className="board">
                    {panel === "history" && <HistoryBoard />}
                    {panel === "ranking" && <RankingBoard />}

                </div>

            </div>
        </div>
    );
}

export { Game };
