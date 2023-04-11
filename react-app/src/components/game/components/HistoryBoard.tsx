import PlayerPlate from "./PlayerPlate";
import { HistoryIcon, NoUserIcon, RankingIcon } from "../../../assets/images";
import { useEffect, useState } from "react";
import "../styles/historyBoard.scss";
import MatchPlate from "./MatchPlate";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";
import { MatchType } from "../../pong/Classic/Rules";
import { Match } from "../../../@types/match.types";

export default function HistoryBoard() {
    const [isVisible, setIsVisible] = useState(-1);
    const [socket] = useSocket();
    const { userAuth } = useAuth();
    const [matches, setMatches] = useState<Array<Match>>([]);

    useEffect(() => {
        socket.emit("getMatchesByUser", userAuth.id);
    }, []);

    useEffect(() => {
        socket.on("receiveMatchesByUser", (data: string) =>
            setMatches(JSON.parse(data))
        );
    }, []);

    return (
        <div className="matches-container">
            <div className="matches-header">
                <span>Date</span>
                <span className="score-header">Score</span>
                <span>Type</span>
            </div>
            <div className="matches">
                {matches.map((match: Match, index: number) => (
                    <MatchPlate match={match} key={index} />
                ))}
            </div>
        </div>
    );
}
