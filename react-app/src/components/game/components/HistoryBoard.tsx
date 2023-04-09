import PlayerPlate from "./PlayerPlate";
import { HistoryIcon, NoUserIcon, RankingIcon } from "../../../assets/images";
import { useEffect, useState } from "react";
import "../styles/historyBoard.scss";
import MatchPlate from "./MatchPlate";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";
import { MatchType } from "../../pong/Classic/Rules";
import { Match } from "../../../@types/match.types";

type Props = {};

// const matches = [
//     {
//         username1: "user1",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user1",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user1",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user11212",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user1",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user1",
//         username2: "user12121",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user1",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
//     {
//         username1: "user1",
//         username2: "user1",
//         score1: 0,
//         score2: 0,
//         avatar1: NoUserIcon,
//         avatar2: NoUserIcon,
//         type: "ranked",
//         playDate: new Date(),
//     },
// ];

export default function HistoryBoard({}: Props) {
    const [isVisible, setIsVisible] = useState(-1);
	const [socket] = useSocket();
	const {userAuth} = useAuth();
	const [matches, setMatches] = useState<Array<Match>>([]);
	
	useEffect(() => {
		socket.emit("getMatchesByUser", userAuth.id);
	}, []);
	
	useEffect(() => {
		socket.on("receiveMatchesByUser", (data: string) => setMatches(JSON.parse(data)));
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
