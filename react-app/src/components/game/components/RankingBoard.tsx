import PlayerPlate from "./PlayerPlate";
import { RankingIcon } from "../../../assets/images";
import { useState } from "react";
import { players } from "../players.dataset"; // test purposes
import { player } from "../../../@types/match.types";
import "../styles/rankingBoard.scss";
type Props = {};

export default function RankingBoard({}: Props) {
    const [isVisible, setIsVisible] = useState(-1);

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
