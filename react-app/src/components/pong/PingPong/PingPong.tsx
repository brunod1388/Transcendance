// import { CSSProperties, PropsWithChildren } from "react";
// import { leaveGame } from "../../../utils/pong.utils";
// import { useNavigate } from "react-router-dom";
// import {
//     Score,
//     Position,
//     PADDLE_WIDTH,
//     PADDLE_HEIGHT,
//     PLAYING,
//     BALL_RADIUS,
//     HEIGHT,
//     WIDTH,
//     WIN1,
//     WIN2,
// } from "../../../@types";
// import { useSocket, useQuery, useTimeout } from "../../../hooks";
// import {
//     useMyPaddle,
//     useYourPaddle,
//     useBall,
//     useGame,
//     useLoadGame,
// } from "../../../hooks/pong";
// import style from "./pong.module.scss";

// interface PropsGame {
//     room: string;
//     host: boolean;
//     opponent: string;
//     onEnd: () => void;
// }

// interface PropsPong {
//     room: string;
//     host: boolean;
//     score: Score;
//     onScore: (side: string) => void;
// }
// interface PropsMain {
//     onEnd: () => void;
// }

// interface GameComponents {
// 	Board:

// }

// interface SkinComponents {
// 	Board:
// 	Paddle1:
// 	Paddle2:
// 	Ball:
// }

// export function PingPong(props: PropsMain) {
// 	const room = useQuery("room"); // room id

// }
// export function Pong(props: PropsMain) {
//     const room = useQuery("room"); // room id
//     const [socket] = useSocket();
//     const navigate = useNavigate();
//     const [opponent, host, isLoading] = useLoadGame(
//         room,
//         navigate,
//         props.onEnd
//     );

//     useTimeout(() => {
//         if (isLoading) {
//             leaveGame(socket, room, navigate);
//         }
//     }, 5000);

//     if (isLoading) {
//         return <div>Loading</div>;
//     } else if (room === "") {
//         return <></>;
//     }
//     return (
//         <Game room={room} host={host} opponent={opponent} onEnd={props.onEnd} />
//     );
// }

// function Game({ room, host, opponent, onEnd }: PropsGame) {
//     const navigate = useNavigate();
//     const [statut, score, onScore] = useGame(room, host, navigate, onEnd);

//     return (
//         <div>
//             <div className={style.container} tabIndex={-1}>
//                 <EndScreen host={host} statut={statut} score={score}>
//                     <Board
//                         host={host}
//                         room={room}
//                         score={score}
//                         onScore={onScore}
//                     />
//                 </EndScreen>
//             </div>
//         </div>
//     );
// }

// function Board({ host, room, onScore, score }: PropsPong) {
//     const paddle1 = useYourPaddle(host, score);
//     const paddle2 = useMyPaddle(host, room, score);
//     const ball = useBall(host, room, paddle1, paddle2, onScore, score);

//     return (
//         <>
//             <div
//                 style={{ width: "100%", height: "100%", position: "absolute" }}
//             >
//                 <svg width="100%" height={"100%"}>
//                     <line
//                         className={style.line}
//                         x1={WIDTH / 2}
//                         y1="0"
//                         x2={WIDTH / 2}
//                         y2={HEIGHT}
//                     />
//                 </svg>
//             </div>
//             <GameScore {...{ ...score }} />
//             <Paddle x={paddle1.x} y={paddle1.y} />
//             <Paddle x={paddle2.x} y={paddle2.y} />
//             <Ball x={ball.x} y={ball.y} />
//         </>
//     );
// }

// function GameScore(score: Score) {
//     return (
//         <>
//             <div className={style.score} id={style["right"]}>
//                 {score.player2}
//             </div>
//             <div className={style.score} id={style["left"]}>
//                 {score.player1}
//             </div>
//         </>
//     );
// }

// function Paddle(paddle: Position) {
//     const side = paddle.x > WIDTH / 2 ? style.right : style.left;
//     const position: CSSProperties = {
//         left: paddle.x - PADDLE_WIDTH,
//         bottom: paddle.y - PADDLE_HEIGHT,
//     };
//     return <div style={position} className={style.paddle + " " + side}></div>;
// }

// function Ball(ball: Position) {
//     const position: CSSProperties = {
//         left: ball.x - BALL_RADIUS,
//         bottom: ball.y - BALL_RADIUS,
//     };

//     return <div style={position} className={style.ball}></div>;
// }

// interface Props {
//     score: Score;
//     host: boolean;
//     statut: number;
// }

// function EndScreen({
//     score,
//     statut,
//     host,
//     children,
// }: PropsWithChildren<Props>) {
//     if (statut === PLAYING) {
//         return <>{children}</>;
//     }

//     if ((host && statut === WIN1) || (!host && statut === WIN2)) {
//         return (
//             <div className={style.endScreen}>
//                 <div className={style.wrapper}>
//                     <div className={style.win}>You Win!</div>
//                     <p className={style.finalScore}>
//                         {score.player1}-{score.player2}
//                     </p>
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <div className={style.endScreen}>
//             <div className={style.wrapper}>
//                 <div className={style.lost}>You Lost...</div>
//                 <p className={style.finalScore}>
//                     {score.player1}-{score.player2}
//                 </p>
//             </div>
//         </div>
//     );
// }
export {};
