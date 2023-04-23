import { MatchSummary } from "@customTypes/match.types";
import { getLeague } from "utils";
import "../styles/userDetails.scss";
import "assets/styles/league.scss";

type Props = {
    matchSummary: MatchSummary;
    small?: boolean;
};

export default function UserDetails(props: Props) {
    const { matchSummary, small = false } = props;
    return (
        <div className="user-details">
            <div className={small ? "small" : ""}>
                <span>Wins</span> <span>{matchSummary.totalWins}</span>
            </div>
            <div className={small ? "small" : ""}>
                <span>Losses</span> <span>{matchSummary.totalLoses}</span>
            </div>
            <div className={small ? "small" : ""}>
                <span>Total</span> <span>{matchSummary.totalGames}</span>
            </div>
            <div className={small ? "small" : ""}>
                <span>Points</span> <span>{matchSummary.points}</span>
            </div>
            <div className={small ? "small" : ""}>
                <span>League</span>
                <span className={"league " + getLeague(matchSummary.points)}>
                    {getLeague(matchSummary.points)}
                </span>
            </div>
        </div>
    );
}
