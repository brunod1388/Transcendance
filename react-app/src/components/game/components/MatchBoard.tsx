import React, { useEffect, useState } from "react";
import { MatchIcon } from "../../../assets/images";
import "../styles/matchBoard.scss";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";
import { Matchmaking } from "./Matchmaking";
type Props = {};

export default function MatchBoard({}: Props) {
    return (
        <div className="match-container">
			<Matchmaking/>
        </div>
    );
}
