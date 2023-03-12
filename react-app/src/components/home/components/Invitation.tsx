import React from "react";
import {
    NoChannelIcon,
    NoUserIcon,
    Accept,
    Decline,
} from "../../../assets/images";
import { useSocket } from "../../../hooks";

interface Props {
    type: "Friend" | "Channel";
    id: number;
    name: string;
}

const notifIcons = new Map<string, string>([
    ["Friend", NoUserIcon],
    ["Channel", NoChannelIcon],
]);

export default function Invitations(props: Props) {
    const icon = notifIcons.get(props.type);
    const [socket] = useSocket();
    const { type, id, name } = props;

    function handleInvitation(type: string, accept: boolean, id: number) {
        const handleMessage =
            type === "Friend" ? "handleFriend" : "handleChannelUser";
        socket.emit("handleFriend", id, accept, (res: any) => {
            console.log(res);
        });
    }

    return (
        <div className="invitation">
            <img src={icon} alt="" className="icon" />
            <span className="name">
                {type} invitation : {name}
            </span>
            <img
                className="accept animate"
                src={Accept}
                alt=""
                onClick={() => handleInvitation(type, true, id)}
            />
            <img
                className="decline animate"
                src={Decline}
                alt=""
                onClick={() => handleInvitation(type, false, id)}
            />
        </div>
    );
}
