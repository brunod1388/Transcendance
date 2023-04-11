import { useEffect, useState } from "react";
import { useAuth } from "../../../context";
import "../styles/gamerBoard.scss";
import { useSocket } from "../../../hooks";

type Props = {};
interface MatchSummary {
    totalWins: number;
    totalLoses: number;
    totalGames: number;
    points: number;
    league: string;
}

const initialSummary: MatchSummary = {
    totalWins: 0,
    totalLoses: 0,
    totalGames: 0,
    points: 0,
    league: "Noob",
};

export default function GamerBoard({}: Props) {
    const { userAuth } = useAuth();
    const [matchSummary, setMatchSummary] = useState(initialSummary);
    const [socket] = useSocket();

    useEffect(() => {
        socket.emit("getMatchSummary", userAuth.id);
    }, []);

    useEffect(() => {
        socket.on("matchSummary", (data: MatchSummary) =>
            setMatchSummary(data)
        );
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
                        <span>Total wins</span>{" "}
                        <span>{matchSummary.totalWins}</span>
                    </div>
                    <div>
                        <span>Total losses</span>{" "}
                        <span>{matchSummary.totalLoses}</span>
                    </div>
                    <div>
                        <span>Total games</span>{" "}
                        <span>{matchSummary.totalGames}</span>
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
