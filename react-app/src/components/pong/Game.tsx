import { Position, Score } from "../../@types";
import { GameEvent } from "./GameEvent";
import {
    GameConfig,
    GameMode,
    PlayerInfo,
    initialPlayer,
} from "./Game";
import { useState } from "react";

interface GameProps {
    onEnd: () => void;
    mode: GameMode;
    config: GameConfig;
    room: string;
}

export function Game({ config, mode, room, onEnd }: GameProps) {
    const [user, setUser] = useState<PlayerInfo>(initialPlayer);
	const [userPaddle, setUserPaddle] = useState<Position>(new Position(0, 0));
    const [opponent, setOpponent] = useState<PlayerInfo>(initialPlayer);
	const [opponentPaddle, setOpponentPaddle] = useState<Position>(new Position(0, 0));
	const [ball, setBall] = useState<Position>(new Position(0, 0));
	const [score, setScore] = useState<Score>(new Score(0, 0));

    return (
        <GameEvent
            user={user}
            config={config}
            opponent={opponent}
            onEnd={onEnd}
            onUser={(player: PlayerInfo) => setUser(player)}
            onOpponent={(player: PlayerInfo) => setOpponent(player)}
			onScore={(newScore: Score) => setScore(newScore)}
			onBall={(newPos: Position) => setBall(newPos)}
			onOpponentPaddle={(newPos: Position) => setOpponentPaddle(newPos)}
        >
            <Pong mode={props.mode}/>
        </GameEvent>
    );
}
