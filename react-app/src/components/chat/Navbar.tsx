import React from "react";
import { useContext } from "react";

type Props = {};

export default function Navbar({}: Props) {
    // const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <span className="logo">Transcendance</span>
            <div className="user">
                <img src="" alt="" />
                <span>Kikou</span>
                <button onClick={() => {}}>logout</button>
            </div>
        </div>
    );
}
