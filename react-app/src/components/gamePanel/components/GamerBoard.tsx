import { useEffect, useState } from "react";
import { useAuth } from "context";
import { useSocket } from "hooks";
import "../styles/gamerBoard.scss";
import { MatchSummary, initialSummary } from "@customTypes/match.types";

export default function GamerBoard() {
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const [matchSummary, setMatchSummary] = useState(initialSummary);

    useEffect(() => {
        socket.emit("getMatchSummary", userAuth.id);
        socket.on("matchSummary", (data: MatchSummary) => setMatchSummary(data));
        return () => {
            socket.off("matchSummary");
        };
    }, []);

    return (
        <div className="gamer-board">
            <div className="gamer-container">
                <div className="avatar-container">
                    <div className="avatar-border"></div>
                    <img src={userAuth.avatar} alt="" className="avatar" />
                </div>
                <div className="user-info">
                    <h1 className="username">{userAuth.username}</h1>
                    <div>
                        <span>Total wins</span> <span>{matchSummary.totalWins}</span>
                    </div>
                    <div>
                        <span>Total losses</span> <span>{matchSummary.totalLoses}</span>
                    </div>
                    <div>
                        <span>Total games</span> <span>{matchSummary.totalGames}</span>
                    </div>
                    <div>
                        <span>Points</span> <span>{matchSummary.points}</span>
                    </div>
                    <div>
                        <span>League</span> <span>{matchSummary.league}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
