import React, { useEffect, useState } from "react";
import { useSocket } from "../../hooks";
import { InvitationRequestDTO } from "../../@types";
import { Socket } from "socket.io-client";

function newGame(value: string, socket: Socket) {
    let newInvite: InvitationRequestDTO = {
        fromUser: socket.id,
        toUser: value,
    };
    socket.emit("game-request", newInvite);
}

function InvitationButton() {
    const [message, setMessage] = useState("");
    const [socket] = useSocket();
    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };
    return (
        <div
            style={{
                backgroundColor: "orange",
                border: "solid",
                borderColor: "red",
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
                    top: "7px",
                    position: "relative",
                    width: "100%",
                }}
                onClick={() => newGame(message, socket)}
            >
                send
            </button>
        </div>
    );
}

function SendInvitation() {
    const [socket, isConnected] = useSocket();

    useEffect(() => {
        if (socket.id) {
            console.log(`${socket.id} is connected: ${isConnected}`);
        }
    }, [isConnected, socket]);

    return (
        <div>
            <div style={{ backgroundColor: "white" }}>
                <p style={{ textAlign: "center" }}>{socket.id}</p>
            </div>
            <InvitationButton />
        </div>
    );
}

function Play() {
    return (
        <div>
            <SendInvitation />
        </div>
    );
}

export default Play;
