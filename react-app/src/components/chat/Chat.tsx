import { useState } from "react";
import { ContactIcon } from "../../assets/images";
import Sidebar from "./components/Sidebar";
import Friendbar from "./components/Friendbar";
import Feed from "./components/Feed";
import "./styles/chat.scss";

export default function Chat() {
    const [friendsVisible, setFriendsVisible] = useState(false);

    return (
        <div className="chat">
            <Sidebar />
            <Feed />
            <div className="button_container">
                <button
                    className="friendButton"
                    onClick={() => {
                        setFriendsVisible(friendsVisible ? false : true);
                    }}
                >
                    <img src={ContactIcon} alt="" />
                </button>
            </div>
            {friendsVisible && <Friendbar />}
        </div>
    );
}
