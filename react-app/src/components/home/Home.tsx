import { Navbar, Topbar, Friendbar } from ".";
import Chat from "../chat/Chat";
import { useFeature, Feature } from "../../context/feature.context";
import { ContactIcon } from "../../assets/images";
import { useEffect } from "react";
import { useSocket, useVisible } from "../../hooks";
import { useAuth, useChat } from "../../context";
import "./styles/home.scss";

const featureComponent = new Map<number, JSX.Element>([
    [Feature.None, <></>],
    [Feature.Chat, <Chat />],
    // [Feature.Pong, <Pong />],
    // [Feature.Ranking, <Ranking />],
]);

function Home() {
    const { feature } = useFeature();
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const { ref, isVisible, setIsVisible } = useVisible(false);

    useEffect(() => {
        socket.emit("getChannels", { userid: userAuth.id, isPendng: false });
    }, [userAuth.id]);

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
                    {!isVisible &&
                        <button
                            className="friendButton"
                            onClick={() => {
                                setIsVisible(!isVisible);
                            }}
                        >
                            <img src={ContactIcon} alt="" />
                        </button>
                    }
                </div>
                <div className="friendbarContainer" ref={ref}>
                    {isVisible && <Friendbar />}
                </div>
            </div>
        </div>
    );
}

export { Home };
