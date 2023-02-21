import React from "react";
import Channel from "./Channel";
import smile from "../../assets/images/smile-blue.png";
import jouer from "../../assets/images/jouer.png";
import plus from "../../assets/images/plus.png";

type Props = {};

export default function Navbar({}: Props) {
    return (
        <div className="navbar">
            <Channel name="PrivateMessage" image={jouer} />
            <span />
            <Channel name="channel1" image={smile} />
            <Channel name="channel2" image={smile} />
            <Channel name="channel3" image={smile} />
            <span />
            <Channel name="Add Channel" image={plus} />
        </div>
    );
}
