import {
    Position,
    Score,
    GameConfig,
    GameMode,
    PlayerInfo,
    Ball,
    CLASSIC,
    PINGPONG,
    LOADING,
    initialUser,
    initialOpponent,
} from "../../@types";
import { GameEvent } from "./GameEvent";
import { useEffect, useState } from "react";
import { PingPong } from "./PingPong/PingPong";
import { PongClassic } from "./Classic/Classic";
import { gameConfig } from "./GameService";
interface GameProps {
    onEnd: () => void;
    mode: GameMode;
    room: string;
    host: boolean;
    username: string;
}

export function Game({ room, onEnd, host, username }: GameProps) {
    const [mode, setMode] = useState<GameMode>(CLASSIC);
    const [config, setConfig] = useState<GameConfig>(gameConfig(mode, room));
    const [user, setUser] = useState<PlayerInfo>(initialUser(host, username));
    const [opponent, setOpponent] = useState<PlayerInfo>(
        initialOpponent(host, "")
    );
    const [userPaddle, setUserPaddle] = useState<Position>(
        host ? config.initialPaddle1 : config.initialPaddle2
    );
    const [opponentPaddle, setOpponentPaddle] = useState<Position>(
        host ? config.initialPaddle2 : config.initialPaddle1
    );
    const [ball, setBall] = useState<Ball>({pos: { x: config.boardWidth/2, y: config.boardHeight/2}, delta: { x: 0, y: 0}, speed: 0});
    const [score, setScore] = useState<Score>({ player1: 0, player2: 0 });

    useEffect(() => {
        setConfig(gameConfig(mode, room));
    }, [mode]);

    return (
        <GameEvent
            mode={mode}
            host={host}
            room={room}
            score={score}
            user={user}
            config={config}
            opponent={opponent}
            onEnd={onEnd}
            onUser={(player: PlayerInfo) => setUser(player)}
            onOpponent={(player: PlayerInfo) => setOpponent(player)}
            onMode={(newMode: GameMode) => setMode(newMode)}
        >
            {mode === CLASSIC && (
                <PongClassic
                    host={host}
                    room={room}
                    config={config}
                    user={user}
                    opponent={opponent}
                    ball={ball}
                    score={score}
                    paddle1={host ? userPaddle : opponentPaddle}
                    paddle2={host ? opponentPaddle : userPaddle}
                    onPaddle1={(newPos: Position) =>
                        host ? setUserPaddle(newPos) : setOpponentPaddle(newPos)
                    }
                    onPaddle2={(newPos: Position) =>
                        host ? setOpponentPaddle(newPos) : setUserPaddle(newPos)
                    }
                    onOpponentPaddle={(newPos: Position) =>
                        setOpponentPaddle(newPos)
                    }
                    onScore={(newScore: Score) => setScore(newScore)}
                    onBall={(ball: Ball) => setBall(ball)}
                    onEnd={onEnd}
                />
            )}
            {mode === PINGPONG && (
                <PingPong
                    host={host}
                    room={room}
                    config={config}
                    user={user}
                    opponent={opponent}
                    ball={ball}
                    score={score}
                    userPaddle={userPaddle}
                    opponentPaddle={opponentPaddle}
                    onUserPaddle={(newPos: Position) => setUserPaddle(newPos)}
                    onOpponentPaddle={(newPos: Position) =>
                        setOpponentPaddle(newPos)
                    }
                    onScore={(newScore: Score) => setScore(newScore)}
                    onBall={(ball: Ball) => setBall(ball)}
                    onEnd={onEnd}
                />
            )}
        </GameEvent>
    );
}
