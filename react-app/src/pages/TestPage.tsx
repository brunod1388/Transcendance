import React from "react";
import { useSocket } from "../hooks";

function TestPage() {
    const [socket] = useSocket();

    function clicked() {
        socket.emit("send", "hi", (res: string) => {
            console.log(res);
        });
    }

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
