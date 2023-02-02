import { socket } from "../../App";

function clicked() {
    socket.emit("send", "hi", (res: string) => {
        console.log(res);
    });
}

function Pong() {
    return <button onClick={clicked}> PONG </button>;
}

export default Pong;
