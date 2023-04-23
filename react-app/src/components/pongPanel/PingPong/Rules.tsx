// import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
// import {
//     Ball,
//     END_GAME,
//     GameStatus,
//     PlayerInfo,
//     Score,
//     WON,
//     Paddle,
//     GameConfig,
//     Position,
//     DISCONECTED,
//     PositionPingPongPaddle,
//     WIN_SCORE,
//     END_MESSAGE_TIMEOUT,
// } from "@customTypes";
// import { useSocket } from "hooks";
// import { useInterval } from "hooks";
// import { move, detectScore } from "./Physics";
// import { EndScreen } from "../components/EndScreen";
// import "../styles/endScreen.scss";
// import { BallComponent } from "../components/Ball";
// import { MyPaddle, YourPaddle } from "./Paddle";
// import { Board } from "./Board";

// interface Props {
//     ball: Ball;
//     userPaddle: Paddle;
//     opponentPaddle: Paddle;
//     config: GameConfig;
//     room: string;
//     onEnd: () => void;
//     onUserPaddle: (pos: Position) => void;
//     onOpponentPaddle: (pos: Position) => void;
//     onScore: (newScore: Score) => void;
//     onBall: (ball: Ball) => void;
//     score: Score;
//     user: PlayerInfo;
//     opponent: PlayerInfo;
// }

// export function Rules(props: PropsWithChildren<Props>) {
//     const [socket] = useSocket();
//     const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.LAUNCH_BALL);
//     const [update, setUpdate] = useState<boolean>(false);
//     const onGameStatus = (status: GameStatus) => setGameStatus(status);
//     const [lastHit, setLastHit] = useState<number>(0);
//     const [hidden, setHidden] = useState<boolean>(false);

//     const empty: CSSProperties = {};
//     const [myMovement, setMyMovement] = useState<Position>({ x: 0, y: 0 });
//     const [yourMovement, setYourMovement] = useState<Position>({ x: 0, y: 0 });

//     useEffect(() => {
//         props.onBall({
//             ...props.ball,
//             pos: { x: props.config.boardWidth / 2, y: 50 },
//         });
//     }, []);

//     const onLastHit = (posY: number) => {
//         setLastHit(posY);
//     };

//     function startGame() {
//         if (gameStatus === GameStatus.LAUNCH_BALL) {
//             onLastHit(0);
//             onGameStatus(GameStatus.MOVE_BALL);
//         } else if (gameStatus === GameStatus.MOVE_BALL) {
//             if (detectScore(props.ball, props.config)) {
//                 let newScore: Score = {
//                     player1: props.score.player1,
//                     player2: props.score.player2,
//                 };
//                 if (props.ball.pos.y < props.config.boardHeight / 2) {
//                     newScore.player2 += 1;
//                 } else {
//                     newScore.player1 += 1;
//                 }
//                 props.onBall({
//                     pos: {
//                         x: props.config.boardWidth / 2,
//                         y:
//                             props.ball.pos.x < props.config.boardWidth / 2
//                                 ? 50
//                                 : props.config.boardHeight - 50,
//                     },
//                     delta: { x: 0, y: 0 },
//                     speed: 0.7,
//                 });
//                 onLastHit(0);
//                 socket.emit("game-score", {
//                     room: props.room,
//                     score: newScore,
//                 });
//                 props.onScore(newScore);
//                 onGameStatus(GameStatus.LAUNCH_BALL);
//             } else {
//                 move(
//                     props.ball,
//                     props.onBall,
//                     props.userPaddle,
//                     props.opponentPaddle,
//                     props.config,
//                     myMovement,
//                     yourMovement,
//                     lastHit,
//                     onLastHit
//                 );
//             }
//         }
//     }

//     useEffect(() => {
//         setHidden(document.hidden);
//     }, [document.hidden]);

//     useInterval(() => {
//         if (gameStatus !== END_GAME && hidden === false) {
//             setUpdate(true);
//         }
//     }, 10);

//     useEffect(() => {
//         if (props.user.host) {
//             startGame();
//             socket.emit("game-ball", { data: props.ball, room: props.room });
//         }
//         setUpdate(false);
//     }, [update]);

//     useEffect(() => {
//         socket.on("game-score", (newScore: Score) => {
//             props.onScore(newScore);
//         });

//         socket.on("game-ball", (ball: Ball) => {
//             if (props.user.host === false) {
//                 props.onBall({
//                     ...ball,
//                     pos: {
//                         x: props.config.boardWidth - ball.pos.x,
//                         y: props.config.boardHeight - ball.pos.y,
//                     },
//                 });
//             }
//         });

//         socket.on("game-paddle", (data: PositionPingPongPaddle) => {
//             if (data.movement !== undefined) {
//                 setYourMovement(data.movement);
//             }
//             props.onOpponentPaddle({
//                 x:
//                     props.config.boardWidth -
//                     data.pos.x +
//                     (props.user.host ? 0 : -props.config.paddleWidth),
//                 y: props.config.boardHeight - data.pos.y + props.config.paddleHeight,
//             });
//         });
//         return () => {
//             socket.off("game-score");
//             socket.off("game-paddle");
//             socket.off("game-ball");
//         };
//     }, []);

//     useEffect(() => {
//         if (gameStatus === END_GAME) {
//             const timer = setTimeout(() => {
//                 props.onEnd();
//             }, END_MESSAGE_TIMEOUT);

//             return () => clearTimeout(timer);
//         }
//     }, [gameStatus]);

//     useEffect(() => {
//         if (props.score.player1 >= WIN_SCORE || props.score.player2 >= WIN_SCORE) {
//             if (props.user.host === true) {
//                 socket.emit("newMatch", {
//                     user1id: props.user.id,
//                     user2id: props.opponent.id,
//                     winner: props.score.player1 >= WIN_SCORE ? props.user.id : props.opponent.id,
//                     score1: props.score.player1,
//                     score2: props.score.player2,
//                     type: "Training",
//                 });
//             }
//             setGameStatus(END_GAME);
//         }
//     }, [props.score]);

//     if (gameStatus === END_GAME || props.opponent.status === DISCONECTED) {
//         return <EndScreen opponent={props.opponent} user={props.user} score={props.score} />;
//     }

//     return (
//         <div className="play-board-container">
//             <Board user={props.user} score={props.score} config={props.config}>
//                 <BallComponent ball={props.ball} config={props.config} skin={empty} />
//                 <MyPaddle
//                     onMyMovement={(newMove: Position) => setMyMovement(newMove)}
//                     myMovement={myMovement}
//                     onMyPaddle={props.onUserPaddle}
//                     room={props.room}
//                     host={props.user.host}
//                     myPaddle={props.userPaddle}
//                     skin={empty}
//                     config={props.config}
//                 />
//                 <YourPaddle
//                     onYourPaddle={props.onOpponentPaddle}
//                     room={props.room}
//                     host={props.opponent.host}
//                     yourPaddle={props.opponentPaddle}
//                     skin={empty}
//                     config={props.config}
//                 />
//             </Board>
//         </div>
//     );
// }
export {};
