import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { Navbar, Topbar, Settings, Friendbar } from ".";
import Chat from "../chat/Chat";
import { useAuth } from "../../context";
import { useAxios, useInvitation } from "../../hooks";
import { AxiosRequestConfig } from "axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Cookies from "js-cookie";
import { useFeature, Feature } from "../../context/feature.context";
import { ContactIcon } from "../../assets/images";
import "./styles/home.scss";

const defaultRequest: AxiosRequestConfig = {
    method: "GET",
    url: "/users/me",
};

const featureComponent = new Map<number, JSX.Element>([
    [Feature.None, <></>],
    [Feature.Chat, <Chat />],
    [Feature.Setting, <Settings />],
    // [Feature.Pong, <Pong />],
    // [Feature.Ranking, <Ranking />],
]);

function Home() {
    const [request] = useState<AxiosRequestConfig>(defaultRequest);
    const navigate = useNavigate();
    const { userAuth } = useAuth();
    const { setItem, getItem, removeItem } = useLocalStorage();
    const { response, error } = useAxios(request);
    const { feature } = useFeature();
    const [friendsVisible, setFriendsVisible] = useState(false);

    useInvitation();

    useEffect(() => {
        if (response !== undefined) {
            const user = {
                id: response.data.id,
                username: response.data.username,
                avatar: response.data.avatar,
                authStrategy: response.data.authStrategy,
                enable2FA: response.data.enable2FA,
            };
            if (JSON.stringify(user) !== getItem("user")) {
                setItem("user", JSON.stringify(user));
            }
        }
    }, [response]);

    useEffect(() => {
        if (error?.response?.status === 401) {
            console.log(
                "*** UNAUTHORIZED USE OF THE SITE - PLEASE SIGNIN IN ***"
            );
            removeItem("user");
            Cookies.remove("JWTtoken", { sameSite: "none", secure: true });
            navigate("/login");
        }
    }, [error]);

    useEffect(() => {
        console.log("AUTH user in homepage: ", userAuth);
    }, [userAuth]);

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
