import React from "react";
import {
    NoChannelIcon,
    NoUserIcon,
    Accept,
    Decline,
} from "../../../assets/images";

type Props = {
    type: string;
    name: string;
};

const notifIcons = new Map<string, string>([
    ["friend", NoUserIcon],
    ["channel", NoChannelIcon],
]);

export default function Notification(props: Props) {
    const icon = notifIcons.get(props.type);
    return (
        <div className="notification">
            <img src={icon} alt="" className="icon" />
            <span className="name">{props.name}</span>
            <img
                className="accept animate"
                src={Accept}
                alt=""
                onClick={() => {}}
            />
            <img
                className="decline animate"
                src={Decline}
                alt=""
                onClick={() => {}}
            />
        </div>
    );
}
