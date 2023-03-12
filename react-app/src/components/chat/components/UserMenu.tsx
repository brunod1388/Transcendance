import React from "react";
import axios from "axios";
import { UserType } from "../../../@types";
import { useAuth } from "../../../context";
import { useSocket } from "../../../hooks";
import { createId, sendInvitation} from "../../../utils";

interface Props {
    user: UserType;
}

export default function UserMenu({ user }: Props) {
    const { userAuth } = useAuth();

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
