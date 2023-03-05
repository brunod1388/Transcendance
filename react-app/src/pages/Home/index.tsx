import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../../components/home/Navbar";
import Topbar from "../../components/home/Topbar";
import Chat from "../../components/chat/Chat";
import { useAuth } from "../../context";
import { useAxios } from "../../hooks";
import { AxiosRequestConfig } from "axios";
import "./home.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Cookies from "js-cookie";

const defaultRequest: AxiosRequestConfig = {
    method: "GET",
    url: "/users/me",
};

function Home() {
    const [request] = useState<AxiosRequestConfig>(defaultRequest);
    const navigate = useNavigate();
    const { userAuth } = useAuth();
    const { setItem, getItem, removeItem } = useLocalStorage();
    const { response, error } = useAxios(request);

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
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
