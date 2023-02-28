import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/chat/Sidebar";
import Navbar from "../../components/chat/Navbar";
import Chat from "../../components/chat/Chat";
import { useAuth } from "../../context";
import { useAxios } from "../../hooks";
import { defaultUser } from "../../@types";
import Cookies from "js-cookie";
//import axios from "axios";
import { AxiosRequestConfig } from "axios";
import "./home.scss";

//axios.defaults.baseURL = `http://localhost:3000`;
//axios.defaults.withCredentials = true;

const defaultRequest: AxiosRequestConfig = {
    method: "",
    url: "",
};

function Home() {
    const [request, setRequest] = useState<AxiosRequestConfig>(defaultRequest);
    const navigate = useNavigate();
    const { userAuth, token, updateUser, updateToken } = useAuth();
    const { response, error } = useAxios(request);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setRequest({
                method: "GET",
                url: "/users/me",
            });
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (response !== undefined && userAuth === defaultUser) {
            const jwtToken = Cookies.get("JWTtoken");
            if (jwtToken && token === "") {
                updateToken(jwtToken);
            }
            updateUser({
                id: response.data.id,
                username: response.data.username,
                avatar: response.data.avatar,
                authStrategy: response.data.authStrategy,
                enable2FA: response.data.enable2FA,
            });
        }
    }, [response]);

    useEffect(() => {
        if (error?.response?.status === 401) {
            console.log(
                "*** UNAUTHORIZED USE OF THE SITE - PLEASE SIGNIN IN ***"
            );
            navigate("/login");
        }
    }, [error]);

    /*
    React.useEffect(() => {
        let isMounted = true;

        const jwtToken = Cookies.get("JWTtoken");
        console.log("Response cookie: ", token);
        if (jwtToken && token === "") {
            updateToken(jwtToken);
        }
        const fetchUser = async () => {
            try {
                const res = await axios.request({
                    method: "GET",
                    url: "/users/me",
                });
                console.log("Response status code: ", res.status);
                if (res !== undefined && isMounted && userAuth !== defaultUser) {
                    updateUser({
                        id: res.data.id,
                        username: res.data.username,
                        authStrategy: res.data.authStrategy,
                        enable2FA: res.data.enable2FA,
                    });
                }
                else if (res !== undefined && res.status === 401) {
                    console.log("UNAUTHORISED USE OF THE SITE - PLEASE SIGNIN IN");
                    navigate('/login');
                }
            } catch (err: any) {
                console.log(err);
            }
        };
        fetchUser();
        return () => {
            isMounted = false;
        };
        //        console.log("AUTH IN HOMEPAGE: ", Auth);
        //        console.log("RESPONSE DATA: ", response.data);
    }, []);
    */

    useEffect(() => {
        console.log("AUTH user in homepage: ", userAuth);
    }, [userAuth]);

    useEffect(() => {
        console.log("AUTH token in homepage: ", token);
    }, [token]);

    return (
        <div className="home">
            <div className="container">
                <Navbar />
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home;
