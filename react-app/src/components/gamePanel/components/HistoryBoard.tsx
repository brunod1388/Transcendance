import { useEffect, useState } from "react";
import MatchPlate from "./MatchPlate";
import { useSocket } from "hooks";
import { useAuth } from "context";
import { Match } from "@customTypes/match.types";
import "../styles/historyBoard.scss";

export default function HistoryBoard() {
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
