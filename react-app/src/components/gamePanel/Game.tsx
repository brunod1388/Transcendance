import { useState } from "react";
import { HistoryIcon, MatchIcon, NoChannelIcon, NoUserIcon, RankingIcon } from "../../assets/images";
import GamerBoard from "./components/GamerBoard";
import RankingBoard from "./components/RankingBoard";
import HistoryBoard from "./components/HistoryBoard";
import BoardLayout from "./components/BoardLayout";
import { Matchmaking } from "./components/Matchmaking";
import "./styles/game.scss";

enum BoardType {
    ranking = "ranking",
    history = "history",
    match = "match",
}

const RANKING = BoardType.ranking;
const HISTORY = BoardType.history;
const MATCH = BoardType.match;

type PanelType = {
    title: string;
    icon: string;
    board: JSX.Element;
}

const panels = new Map<BoardType,PanelType> ([
    [BoardType.ranking,
        {title: "Ranking Board", icon: RankingIcon, board: <RankingBoard/>}],
    [BoardType.history,
        {title: "Match History", icon: HistoryIcon, board: <HistoryBoard/>}],
    [BoardType.match,
        {title: "Matchmaking", icon: MatchIcon, board: <Matchmaking/>}],
])

type TabProps = {
    panel: BoardType;
    setPanel: (panel: BoardType) => void;
    current: BoardType;
}

function Tab(props : TabProps) {
    const {panel, setPanel, current} = props;
    return (
        <div
            className={`tab ${panel === current ? "selected" : ""}`}
            onClick={() => setPanel(panel)}
        >
            <img src={panels.get(panel)?.icon}/>
        </div>
    )
}

function Game() {
    const [panel, setPanel] = useState<BoardType>(BoardType.match);
    const {title, icon, board} = panels.get(panel) || {title: "", titleIcon: NoChannelIcon, element: <></>};

    return (
        <div className="game-container">
            <GamerBoard />
            <div className="board-container">
                <div className="board-tabs">
                    <Tab panel={MATCH} setPanel={setPanel} current={panel}/>
                    <Tab panel={HISTORY} setPanel={setPanel} current={panel}/>
                    <Tab panel={RANKING} setPanel={setPanel} current={panel}/>
                </div>
                <div className="board">
                    <BoardLayout title={title} titleIcon={String(icon)}>
                        {board}
                    </BoardLayout>
                </div>
            </div>
        </div>
    );
}

export { Game };
