// import { useState, useEffect, useCallback } from "react";
// import { useInterval, useSocket, useKeyboard } from "..";
// import {
//     Position,
//     HEIGHT,
//     PADDLE_HEIGHT,
//     LEFT_PADDLE,
//     RIGHT_PADDLE,
//     Score,
//     Broadcast,
//     SetStateType,
// } from "../../@types";

// // Opponent Paddle: receive the position by websocket
// export function useYourPaddle(isHost: boolean, score: Score) {
//     const [paddle, setPaddle] = useState<Position>({
//         x: isHost ? RIGHT_PADDLE : LEFT_PADDLE,
//         y: HEIGHT / 2,
//     });
//     const [socket] = useSocket();

//     useEffect(() => {
//         socket.on("game-paddle", (position: Position) => {
//             setPaddle(position);
//         });
//         return () => {
//             socket.off("game-paddle");
//         };
//     }, [socket]);

//     useEffect(() => {
//         setPaddle((prev: Position) => new Position(prev.x, HEIGHT / 2));
//     }, [score]);

//     return paddle;
// }

// // User Paddle: react to user's keyboard and send its position to the opponent.
// export function useMyPaddle(isHost: boolean, room: string, score: Score) {
//     const [paddle, setPaddle] = useInputPaddle(isHost);
//     const [socket] = useSocket();
//     const [update, setUpdate] = useState<Position>({ x: 0, y: 0 });

//     useInterval(() => setUpdate(paddle), 50);

//     useEffect(() => {
//         socket.emit(
//             "game-broadcast",
//             new Broadcast(room, "game-paddle", { x: update.x, y: update.y })
//         );
//     }, [socket, update, room]);

//     useEffect(() => {
//         setPaddle((prev: Position) => new Position(prev.x, HEIGHT / 2));
//     }, [score, setPaddle]);

//     return paddle;
// }

// // Detect the input from the keyboard and move the user's paddle.
// function useInputPaddle(isHost: boolean): [Position, SetStateType<Position>] {
//     const [paddle, setPaddle] = useState<Position>({
//         x: isHost ? RIGHT_PADDLE : LEFT_PADDLE,
//         y: HEIGHT / 2,
//     });

//     const handler = useCallback(
//         (event: KeyboardEvent) => {
//             if (
//                 event.key === "ArrowUp" &&
//                 paddle.y + PADDLE_HEIGHT + 10 <= HEIGHT
//             )
//                 setPaddle(
//                     (prev: Position) => new Position(prev.x, prev.y + 10)
//                 );
//             if (event.key === "ArrowDown" && paddle.y - PADDLE_HEIGHT - 10 >= 0)
//                 setPaddle(
//                     (prev: Position) => new Position(prev.x, prev.y - 10)
//                 );
//         },
//         [setPaddle, paddle]
//     );
//     useKeyboard(handler, document);
//     return [paddle, setPaddle];
// }
export {}
