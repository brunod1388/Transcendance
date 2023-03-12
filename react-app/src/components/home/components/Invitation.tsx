import React, { useEffect, useState } from "react";
import {
    NoChannelIcon,
    NoUserIcon,
    Accept,
    Decline,
} from "../../../assets/images";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";

interface Props {
    type: "Friend" | "Channel";
    id: number;
    name: string;
    image: string;
}

const notifIcons = new Map<string, string>([
    ["Friend", NoUserIcon],
    ["Channel", NoChannelIcon],
]);

interface invitationType {
    id: number;
    type: "Friend" | "Channel";
    name: string;
    image: string;
}

export default function Invitations() {
    const [socket] = useSocket();
    const { userAuth } = useAuth();
    const [invitations, setInvitations] = useState<invitationType[]>([]);

    function handleInvitation(type: string, accept: boolean, id: number) {
        const handleMessage =
            type === "Friend" ? "updateFriend" : "updateChannelUser";
        socket.emit(handleMessage, id, accept, (res: any) => {
            console.log(res);
        });
    }
    useEffect(() => {
        // socket.emit("getFriends", userAuth.id, true, (res: any) => {
        //     console.log(res);
        // })
        socket.emit("getChannelsPending", userAuth.id, (res: any) => {
            const channelInvitations = res.map((channelUser: any) => ({
                id: channelUser.channel.id,
                type: "Channel",
                name: channelUser.channel.name,
                image: channelUser.channel.image ? channelUser.channel.image : ""
            }));
            setInvitations(channelInvitations);
        });
    }, []);

    return (
        <div className="invitations">
            {invitations.length === 0 &&
                <span className="title noInvitation">No pending invitations</span> }
            { invitations.length > 0 &&
                <span className="title">Invitation</span>}
            { invitations.length > 0 && invitations.map((invite) => (
                <div className="invitation" key={invite.name}>
                    <img src={invite.image} alt="" className="icon" />
                    <span className="name">{invite.type} invitation : {invite.name}</span>
                    <img
                        className="accept animate"
                        src={Accept}
                        alt=""
                        onClick={() => handleInvitation(invite.type, true, invite.id)}
                    />
                    <img
                        className="decline animate"
                        src={Decline}
                        alt=""
                        onClick={() => handleInvitation(invite.type, false, invite.id)}
                    />
                </div>
            ))}
        </div>
    );
}
