import { useAuth } from "../../context";
import { SmileblueIcon } from "../../assets/images";

import "./styles/game.scss";
type Props = {};

interface player {
    username: string;
    avatar: string;
    wins: number;
    losses: number;
    points: number;
    league: string;
}

const players = [
    {"username": "user1", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user2", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user3", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user4", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user5", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user6", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user7", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user8", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user9", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user10", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user11", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user12", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
    {"username": "user13", "avatar": SmileblueIcon, "wins": 0, "losses": 0, "points": 0, "league": "Noob"},
]

function ratio(player: player) {
    if (player.losses === 0) return 1;
    if (player.wins === 0) return 0;
    return player.wins / ( player.wins + player.losses );
}

function Game({}: Props) {
    const { userAuth } = useAuth();

    return (
        <div className="game-container">
            <div className="gamer-board">
                <div className="avatar-border" />
                <img src={userAuth.avatar} alt="" className="avatar"/>
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
                    <button className="button-purple" onClick={() => {}}>Match</button>
                    <button className="button-purple" onClick={() => {}}>Button 2</button>
                    <button className="button-purple" onClick={() => {}}>Button 3</button>
                </div>
            </div>
            <div className="ranking-board">
                <h1 className="title">Ranking</h1>
                <div className="players-container">
                    <div className="players">
                        {
                            players.map((player: player, index: number) => {
                                return (
                                    <div className="player" key={index}>
                                        <span>
                                            <img src={player.avatar} alt="" className="avatar" />
                                            <h1>{player.username}</h1>
                                        </span>
                                        <span>{player.league}</span>
                                        <span>{ratio(player) * 100 + "%"}</span>
                                        <span>{player.points}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Game };
