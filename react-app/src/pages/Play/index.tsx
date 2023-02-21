import React, { useState } from "react";
import Game from "../../components/pong/Pong/Pong";
import { socket } from "../../App";
import { InvitationRequest } from "../../components/pong/Event/Invitation/Invitation.interface";
// import { InvitationResponse } from "../../components/Event/Invitation/Invitation.interface";
function newGame(value: string) {
    console.log(`value is ${value}`);
    let newInvite: InvitationRequest = {
        fromUser: socket.id,
        toUser: value,
    };
    socket.emit("game-request", newInvite);
}

function InvitationButton() {
    const [message, setMessage] = useState("");
    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };
    return (
        <div
            style={{
                backgroundColor: "orange",
                top: "255px",
                right: "250px",
                border: "solid",
                borderColor: "red",
                position: "relative",
                width: "230px",
                height: "80px",
                zIndex: 1000,
            }}
        >
            <h1 style={{ fontSize: "20px" }}>Invitation Game</h1>
            <span style={{ fontSize: "13px" }}>from:</span>
            <span
                style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "blue",
                }}
            >
                {socket.id}
            </span>
            <div>
                to:
                <input
                    type="text"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    value={message}
                    style={{
                        marginLeft: "5px",
                        width: "175px",
                        position: "absolute",
                    }}
                />
            </div>
            <button
                style={{
                    left: "0",
                    bottom: "0",
                    position: "absolute",
                    width: "100%",
                }}
                onClick={() => newGame(message)}
            >
                send
            </button>
        </div>
    );
}

function Play() {
    return (
        <div>
            {/* <h1>Play Page</h1> */}
            <Game />
            <InvitationButton />
        </div>
    );
}

export default Play;
