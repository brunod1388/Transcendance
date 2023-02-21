import React from "react";
import { socket } from "../App";

function clicked() {
    socket.emit("send", "hi", (res: string) => {
        console.log(res);
    });
}

function TestPage() {
    return (
        <div>
            <div>
                <h1>Test Page</h1>
            </div>
            {/* <p className="subtitle">Play</p> */}
            <div>
                <button onClick={clicked}> PONG </button>
            </div>
        </div>
    );
}

export default TestPage;
