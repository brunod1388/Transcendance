import React from "react";
import { player } from "../../../@types/match.types";
import "../styles/playerPlate.scss";

type Props = {
	player: player;
	isVisible: number;
	index: number;
	setIsVisible: React.Dispatch<React.SetStateAction<number>>;
}

function ratio(player: player) {
    if (player.losses === 0) return 1;
    if (player.wins === 0) return 0;
    return player.wins / (player.wins + player.losses);
}

export default function PlayerPlate(props: Props) {
	const { player, isVisible, index, setIsVisible } = props;
    return (
        <div
            className="player"
            key={index}
            onClick={() =>
                setIsVisible((current) => (index === current ? -1 : index))
            }
        >
            <div className="player-plate">
                <span>
                    <img src={player.avatar} alt="" className="avatar" />
                    <h1>{player.username}</h1>
                </span>
                <span>{player.league}</span>
                <span>{ratio(player) * 100 + "%"}</span>
                <span>{player.points}</span>
            </div>
            {isVisible === index && (
                <div className="player-details">
                    <div className="details">
                        <div className="detail">
                            <span>Wins: </span>
                            <span>{player.wins}</span>
                        </div>
                        <div className="detail">
                            <span>Losses: </span>
                            <span>{player.losses}</span>
                        </div>
                        <div className="detail">
                            <span>Total: </span>
                            <span>{player.losses + player.wins}</span>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button className="button-purple">invite Friend</button>
                        <button className="button-purple">Play</button>
                        <button className="button-purple">Message</button>
                    </div>
                </div>
            )}
        </div>
    );
}
