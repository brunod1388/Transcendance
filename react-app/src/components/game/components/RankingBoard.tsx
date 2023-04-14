import PlayerPlate from "./PlayerPlate";
import { useEffect, useState } from "react";
import { player } from "@customTypes/match.types";
import { useSocket } from "hooks";
import "../styles/rankingBoard.scss";

interface Player {
    username: string;
    avatar: string;
    wins: number;
    losses: number;
    points: number;
    league: string;
}

export default function RankingBoard() {
    const [isVisible, setIsVisible] = useState(-1);
    const [socket] = useSocket();
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        socket.emit("getPlayersRanking");
    }, []);

    useEffect(() => {
        socket.on("playersRanking", (data: Player[]) => {
            setPlayers(data);
        });
        return () => {
            socket.off("playersRanking");
        };
    }, []);

    return (
        <div className="players-container">
            <div className="players-header">
                <span>Username</span>
                <span>League</span>
                <span>Win ratio</span>
                <span>Points</span>
            </div>
            <div className="players">
                {players
                    .filter((_, i) => i < 4)
                    .map((player: player, index: number) => (
                        <PlayerPlate
                            player={player}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            index={index}
                            key={index}
                        />
                    ))}
            </div>
        </div>
    );
}
