import { useAuth } from "../../../context";
import "../styles/gamerBoard.scss";

type Props = {};

export default function GamerBoard({}: Props) {
    const { userAuth } = useAuth();

    return (
        <div className="gamer-board">
            <div className="gamer-container">
                <div className="avatar-container">
                    <div className="avatar-border"></div>
                    <img src={userAuth.avatar} alt="" className="avatar" />
                </div>
                <h1 className="username">{userAuth.username}</h1>
                <div className="user-info">
                    <div>
                        <span>Total wins</span> <span>{0}</span>
                    </div>
                    <div>
                        <span>Total losses</span> <span>{0}</span>
                    </div>
                    <div>
                        <span>Total games</span> <span>{0}</span>
                    </div>
                    <div>
                        <span>Points</span> <span>{0}</span>
                    </div>
                    <div>
                        <span>League</span> <span>{"Noob"}</span>
                    </div>
                </div>
                <div className="button-container">
                    <button className="button-purple" onClick={() => {}}>
                        Match
                    </button>
                    <button className="button-purple" onClick={() => {}}>
                        Button 2
                    </button>
                    <button className="button-purple" onClick={() => {}}>
                        Button 3
                    </button>
                </div>
            </div>
        </div>
    );
}
