import { DISCONECTED, PlayerInfo, Score, WIN_SCORE } from "@customTypes";
import "../styles/endScreen.scss";

interface PropsEnd {
    score: Score;
    opponent: PlayerInfo;
    user: PlayerInfo;
}

export function EndScreen(props: PropsEnd) {
    const { score, opponent, user } = props;

    const hasWin =
        props.opponent.status === DISCONECTED ||
        (props.user.host === true && props.score.player1 >= WIN_SCORE) ||
        (props.user.host === false && props.score.player2 >= WIN_SCORE);
    return (
        <div className="endScreen">
            <div className="wrapper">
                <div className={"endText" + (hasWin ? " win" : " lost")}>
                    {hasWin ? "You Win!" : "You Lost!"}
                </div>
                <p className={"finalScore" + (hasWin ? " win" : " lost")}>
                    {user.host ? score.player1 : score.player2}
                    {" - "}
                    {user.host ? score.player2 : score.player1}
                </p>
            </div>
        </div>
    );
}
