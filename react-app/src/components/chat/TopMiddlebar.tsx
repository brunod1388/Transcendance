import React from "react";
import { useContext } from "react";
import "./style.scss";

type Props = {};

export default function TopMiddlebar({}: Props) {
    // const { currentUser } = useContext(AuthContext);

    return (
        <div className="topMiddleBar">
            <span className="logo">Transcendance</span>
            <div className="user">
                <img src="" alt="" />
                <span>Kikou</span>
                <button onClick={() => {}}>logout</button>
            </div>
        </div>
    );
}
