import { Match } from "@customTypes/match.types";
import "../styles/matchPlate.scss";

type Props = {
    match: Match;
};

export default function MatchPlate(props: Props) {
    const { username1, username2, score1, score2, avatar1, avatar2, playDate, type } = props.match;

    const newDate = new Date(playDate);
    const dateStr = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;

    return (
        <div className="match-plate">
            <div className="col date">{dateStr}</div>
            <div className=" col result">
                <div className="col user">
                    <span>{username1}</span>
                    <img src={avatar1} alt="" className="avatar" />
                </div>
                <div className="col score">
                    <p>{`${score1} - ${score2}`}</p>
                </div>
                <div className="col user">
                    <img src={avatar2} alt="" className="avatar" />
                    <span>{username2}</span>
                </div>
            </div>
            <div className="col type">
                <span>{type}</span>
            </div>
        </div>
    );
}
