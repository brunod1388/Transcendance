import { useNavigate, useSearchParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { Navbar, Topbar, Settings } from "../components/home";
import Chat from "../components/chat/Chat";
import { useAuth } from "../context";
import { useAxios, useNotificationsDispatch, useSocket } from "../hooks";
import { AxiosRequestConfig } from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Cookies from "js-cookie";
import { useFeature, Feature } from "../context/feature.context";
import "./styles/home.scss";
import { CreateInvitation, CreateResponse } from "../components/invitations";
import { Pong } from "../components/pong";

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
    const [isPong, setIsPong] = useState<Boolean>(false);
    const { feature } = useFeature();
    const [socket] = useSocket();
    const dispatch = useNotificationsDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

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

    useEffect(() => {
        socket.on("invitation", (invitation: any) =>
            CreateInvitation(invitation, dispatch)
        );
        socket.on("response", (response: any) => {
            if (Number(userAuth.id) === Number(response.to)) {
                CreateResponse(response, dispatch);
            }
        });
        return () => {
            socket.off("invitation");
            socket.off("response");
        };
    }, []);

    useEffect(() => {
        if (searchParams.has("room") === true) {
            setIsPong(true);
        }
    }, [searchParams]);

    return (
        <div className="home">
            <div className="homeContainer">
                <Navbar />
                <div className="mainContainer">
                    <Topbar />
                    <div className="featureContainer">
                        {isPong && (
                            <Pong
                                onEnd={() => {
                                    setIsPong(false);
                                }}
                            />
                        )}
                        {isPong === false && featureComponent.get(feature)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Home };
