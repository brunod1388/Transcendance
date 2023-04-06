// import { useSocket } from "../../hooks/useSocket";
// import { useState, useEffect, useRef } from "react";
// import { BallData } from "../../components/pong";
// import { useInterval } from "..";
// import { Position, Broadcast, HEIGHT, WIDTH, Score } from "../../@types";

// // This hook return the position of the ball received from the client.
// export function useBall(
//     host: boolean,
//     room: string,
//     paddle1: Position,
//     paddle2: Position,
//     onScore: (side: string) => void,
//     score: Score
// ) {
//     if (host === true) {
//         return BallHost(room, paddle1, paddle2, onScore, score);
//     }
//     return BallClient(score);
// }

// // The player is an host, his role is to calculate the position of the ball.
// function BallHost(
//     room: string,
//     paddle1: Position,
//     paddle2: Position,
//     onScore: (side: string) => void,
//     score: Score
// ) {
//     const [socket] = useSocket();
//     const ball = useRef(new BallData());
//     const [update, setUpdate] = useState<boolean>(false);

//     useInterval(() => {
//         setUpdate(true);
//     }, 10);

//     useEffect(() => {
//         ball.current.reset();
//         let timer = setTimeout(() => {
//             ball.current.launchBall();
//         }, 2000);
//         return () => clearTimeout(timer);
//     }, [score]);

//     useEffect(() => {
//         if (update === true) {
//             let newScore = ball.current.scored;
//             if (newScore !== 0) {
//                 onScore(newScore === 1 ? "left" : "right");
//                 ball.current.scored = 0;
//             } else {
//                 ball.current.move(paddle1, paddle2);
//             }
//             let position: Position = ball.current.position;
//             socket.emit(
//                 "game-broadcast",
//                 new Broadcast(room, "game-ball", position)
//             );
//             setUpdate(false);
//         }
//     }, [socket, update, paddle1, paddle2, room, onScore]);

//     return ball.current.position;
// }

// // The player is not an host, he get the ball position from the other player.
// function BallClient(score: Score) {
//     const [ball, setBall] = useState<Position>({ x: WIDTH / 2, y: HEIGHT / 2 });
//     const [socket] = useSocket();

//     useEffect(() => {
//         setBall({x: WIDTH / 2, y: HEIGHT / 2});
//     }, [score]);

//     useEffect(() => {
//         socket.on("game-ball", (position: Position) => {
//             setBall(position);
//         });
//         return () => {
//             socket.off("game-ball");
//         };
//     }, [socket]);

//     return ball;
// }

export {}