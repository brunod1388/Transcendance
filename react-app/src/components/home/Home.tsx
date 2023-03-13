import { Navbar, Topbar, Settings, Friendbar } from ".";
import Chat from "../chat/Chat";
import { useFeature, Feature } from "../../context/feature.context";
import { ContactIcon } from "../../assets/images";
import "./styles/home.scss";
import { useState } from "react";

const featureComponent = new Map<number, JSX.Element>([
    [Feature.None, <></>],
    [Feature.Chat, <Chat />],
    [Feature.Setting, <Settings />],
    // [Feature.Pong, <Pong />],
    // [Feature.Ranking, <Ranking />],
]);

function Home() {
    const { feature } = useFeature();
    const [friendsVisible, setFriendsVisible] = useState(false);

    return (
        <div className="home">
            <div className="homeContainer">
                <Navbar />
                <div className="mainContainer">
                    <Topbar />
                    <div className="featureContainer">
                        {featureComponent.get(feature)}
                    </div>
                </div>
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
        </div>
    );
}

export { Home };
