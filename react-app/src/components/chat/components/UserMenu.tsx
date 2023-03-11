import React from "react";
import axios from "axios";
import { UserType } from "../../../@types";
import { useAuth } from "../../../context";
import { useSocket } from "../../../hooks";

interface InvitationType {
    type: string;
    from: number;
    to: string;
}

const invitation_url = `http://localhost:3000/game/invitation`;
function createInvitation(type: string, from: number, to: string) {
    let newInvitation: InvitationType = { type, from, to };
    return newInvitation;
}

function invitationSucess(response: any) {
    console.log("invitation send");
    console.log(`response ${response.data}`);
}

function invitationFailure(error: any) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
}

interface Props {
    user: UserType;
}

export default function UserMenu({ user }: Props) {
    const { userAuth } = useAuth();
    const [socket] = useSocket();

	React.useEffect(() => {
		socket.on("hello", (message: any) => console.log(message));
		return () => {socket.off("hello"); };
	})

    const sendInvitation = (type: string, from: number, to: string) => {
        const invitation = {
            userId: userAuth.id,
            username: userAuth.username,
            socketId: socket.id,
        };
		console.log('send');
        axios
            .post(invitation_url, invitation)
            .then((response) => invitationSucess(response))
            .catch((error) => invitationFailure(error));
    };

    return (
        <div className="userMenu">
            <div className="btnContainer">
                <button className="askFriend">Ask Friend</button>
            </div>
            <div className="btnContainer">
                <button className="mute">Mute</button>
            </div>
            <div className="btnContainer">
                <button className="block">Block</button>
            </div>
            <div className="btnContainer">
                <button
                    className="Play"
                    onClick={() =>
                        sendInvitation("pong", userAuth.id, user.username)
                    }
                >
                    Play
                </button>
            </div>
        </div>
    );
}
