import PlayerPlate from "./PlayerPlate";
import { History, NoUserIcon, Ranking } from "../../../assets/images";
import { useState } from "react";
import "../styles/historyBoard.scss";
import MatchPlate from "./MatchPlate";

type Props = {};

export interface Match {
    username1: string;
    username2: string;
    avatar1: string;
    avatar2: string;
    score1: number;
    score2: number;
    playDate: Date;
}

const matches = [
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
	{username1: "user1", username2: "user1", score1: 0, score2: 0, avatar1: NoUserIcon, avatar2: NoUserIcon, playerDate: Date()},
]
export default function HistoryBoard({}: Props) {
    const [isVisible, setIsVisible] = useState(-1);

    return (
        <div className="history-board">
            <div className="title-container">
                <img src={History} alt="" />
                <h1 className="title">Match History</h1>
                <img src={History} alt="" />
            </div>
            <div className="matches-container">
                <div className="matches-header">
                    <span>date</span>
                    <span>Username</span>
                    <span>score</span>
                    <span>Username</span>
                </div>
                <div className="players">
                    {matches.map((match: any, index: number) => 
                        <MatchPlate 
                            username1={match.username1}
                            username2={match.username2}
                            avatar1={match.avatar1}
                            avatar2={match.avatar2}
                            score1={match.score1}
                            score2={match.score2}
                            playDate={match.playDate}
                            key={index}
						/>
                    )}
                </div>
            </div>
        </div>
    );
}
