import React, { useEffect, useState } from "react";
import { MatchIcon } from "../../../assets/images";
import "../styles/matchBoard.scss";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";

type Props = {};

export default function MatchBoard({}: Props) {
	const [isWaiting, setIsWaiting] = useState<boolean>(false);
	const [socket] = useSocket();
	const {userAuth} = useAuth();

	useEffect(() => {
		socket.emit("getStatusMatchmaking", userAuth.id);
	}, []);

	useEffect(() => {
		socket.on("matchmakingStatus", (isWaiting: boolean) => setIsWaiting(isWaiting));
		return () => {
			socket.off("matchmakingStatus");
		}
	}, []);

    return (
        <div className="match-container">
            <div className="button-container">
                <div className="button-border" />
                <button className="play-button" onClick={() => {
					 socket.emit((isWaiting)? "leaveMatchmaking" : "joinMatchmaking", userAuth.id);
					 socket.emit("getStatusMatchmaking", userAuth.id);
				}}>{(isWaiting)? "Waiting" : "Play"}</button>
            </div>
        </div>
    );
}
