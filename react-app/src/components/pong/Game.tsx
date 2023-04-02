import {
    Position,
    Score,
    GameConfig,
    GameMode,
    PlayerInfo,
    initialPlayer,
    CLASSIC,
    PINGPONG,
    LOADING,
} from "../../@types";
import { GameEvent } from "./GameEvent";
import { useState } from "react";
import { PingPong } from "./PingPong/PingPong";
import { PongClassic } from "./Classic/PongClassic";
interface GameProps {
    onEnd: () => void;
    mode: GameMode;
    config: GameConfig;
    room: string;
    host: boolean;
    username: string;
}

export function Game({ config, mode, room, onEnd, host, username }: GameProps) {
    const [user, setUser] = useState<PlayerInfo>({
        host,
        username: username,
        status: LOADING,
    });
    const [userPaddle, setUserPaddle] = useState<Position>(new Position(0, 0));
    const [opponent, setOpponent] = useState<PlayerInfo>({
        host: !host,
        username: "",
        status: LOADING,
    });
    const [opponentPaddle, setOpponentPaddle] = useState<Position>(
        new Position(0, 0)
    );
    const [ball, setBall] = useState<Position>(new Position(0, 0));
    const [score, setScore] = useState<Score>({ player1: 0, player2: 0 });
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
            {mode === CLASSIC && (
                <PongClassic
                    room={room}
                    config={config}
                    user={user}
                    opponent={opponent}
                    ball={ball}
                    score={score}
                    userPaddle={userPaddle}
                    opponnentPaddle={opponentPaddle}
                    onEnd={onEnd}
                />
            )}
            {mode === PINGPONG && <PingPong />}
        </GameEvent>
    );
}
