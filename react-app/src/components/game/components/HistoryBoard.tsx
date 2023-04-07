import PlayerPlate from "./PlayerPlate";
import { HistoryIcon, NoUserIcon, RankingIcon } from "../../../assets/images";
import { useState } from "react";
import "../styles/historyBoard.scss";
import MatchPlate from "./MatchPlate";

type Props = {};

const matches = [
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user11212", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user1", username2: "user12121", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, type: "ranked", playDate: new Date()},
]
export default function HistoryBoard({}: Props) {
    const [isVisible, setIsVisible] = useState(-1);

    return (
        <div className="history-board">
            <div className="title-container">
                <img src={HistoryIcon} alt="" />
                <h1 className="title">Match History</h1>
                <img src={HistoryIcon} alt="" />
            </div>
            <div className="matches-container">
                <div className="matches-header">
                    <span>Date</span>
                    <span className="score-header">Score</span>
                    <span>Type</span>
                </div>
                <div className="matches">
                    {matches.map((match: any, index: number) => 
                        <MatchPlate 
                            match={match}
                            key={index}
						/>
                    )}
                </div>
            </div>
        </div>
    );
}
