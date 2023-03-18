import { ChatProvider, SocketProvider } from "../context";
import { Home } from "../components/home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { useAxios } from "../hooks";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const defaultRequest: AxiosRequestConfig = {
    method: "GET",
    url: "/users/me",
};

function Main() {
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

    // useEffect(() => {
    //     console.log("AUTH user in homepage: ", userAuth);
    // }, [userAuth]);

    return (
        <SocketProvider>
            <ChatProvider>
                <Home />
            </ChatProvider>
        </SocketProvider>
    );
}

export { Main };
