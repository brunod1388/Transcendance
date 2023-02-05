import React from "react";
import style from "../Pong.module.css";

interface Position {
    y: number;
    x: number;
}

function Player(props: Position) {
    const paddlePosition: React.CSSProperties = {
        left: props.x,
        bottom: props.y,
    };
    return <div style={paddlePosition} className={style.player}></div>;
}

// function UserPlayer() {
// 	const [posY, setPosY] = useState<number>(125);

// 	const position: React.CSSProperties = {
//         left: 125,
//         bottom: posY,
//     };

// 	const keyDownHandler = (event: KeyboardEvent) => {
// 		console.log(event.code);
// 		if (event.code === "ArrowUp") {
// 			console.log(posY);
// 		  setPosY(posY - 10);
// 		}

// 		if (event.code === "ArrowDown") {
// 		  setPosY(posY + 10);
// 		}
// 	  };

// 	return (
// 		<>
// 				  {/* <input className={style.input} onKeyDown={event => keyDownHandler(event)}/> */}
// 				  <div style={position}  className={style.player} tabIndex={0} onKeyDown={event => keyDownHandler(event)}> </div>
// 		</>);
// }

export { Player };
export default Player;
