import React from "react";

export default function UserMenu() {
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
                <button className="Play">Play</button>
            </div>
        </div>
    );
}
