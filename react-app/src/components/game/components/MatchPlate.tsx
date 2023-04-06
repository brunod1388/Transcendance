import "../styles/matchPlate.scss";

type Props = {
    username1: string;
    username2: string;
    avatar1: string;
    avatar2: string;
    score1: number;
    score2: number;
    playDate: string;
}


export default function MatchPlate(props: Props) {
	const {username1, username2, score1, score2, avatar1, avatar2, playDate} = props;
    return (
        <div className="match">
            <div className="match-plate">
                <span>{playDate}</span>
                <span>
                    <img src={avatar1} alt="" className="avatar" />
                    <h1>{username1}</h1>
                </span>
                <span>{score1}</span>
                <span>{" - "}</span>
                <span>{score2}</span>
                <span>
                    <h1>{username2}</h1>
                    <img src={avatar2} alt="" className="avatar" />
                </span>
            </div>
        </div>
    );
}
