import React from "react";
import { Layout } from "../layouts/Layout";
import { socket } from "../App";

function clicked() {
    socket.emit("send", "hi", (res: string) => {
        console.log(res);
    });
}

function HomePage() {
    return (
        <Layout>
            <div>
                <h1>Home Page</h1>
            </div>
            {/* <p className="subtitle">Play</p> */}
            <div>
                <button onClick={clicked}> PONG </button>
            </div>
        </Layout>
    );
}

export default HomePage;
