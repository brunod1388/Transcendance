import React from "react";
import Sidebar from "../../components/chat/Sidebar";
import Navbar from "../../components/chat/Navbar";
import Chat from "../../components/chat/Chat";
import { useAuth } from "../../context";
//import { useAxios } from "../../hooks";
import Cookies from "js-cookie";
import axios from "axios";
import "./home.scss";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

function Home() {
    const [Auth, { updateUser, updateToken }] = useAuth();
    //    const { response } = useAxios({
    //        method: "GET",
    //        url: "users/me",
    //    });

    /*
    React.useEffect(() => {
        if (response != undefined) {
            console.log("RESPONSE DATA: ", response.data);
        }
    
        const fetchUser = async() => {
            if (Auth.jwt_token != "" && Auth.user.id == -1) {
                try {
                    const res = await axios.request({
                        method: "GET",
                        url: "/users/me",
                    });
                    if (res !== undefined) {
                        console.log("DATA: ", res.data);
                        updateUser(res.data);
                    }
                } catch (err: any) {
                    console.log(err);
                }
            };
        }
    
    }, [response]);
    */

    React.useEffect(() => {
        let isMounted = true;

        const token = Cookies.get("JWTtoken");
        console.log("Response cookie: ", token);
        if (token && Auth.jwt_token === "") {
            updateToken(token);
        }
        const fetchUser = async () => {
            try {
                const res = await axios.request({
                    method: "GET",
                    url: "/users/me",
                });
                if (res !== undefined && isMounted) {
                    //    console.log("DATA: ", res.data);
                    updateUser({
                        id: res.data.id,
                        username: res.data.username,
                        authStrategy: res.data.authStrategy,
                        enable2FA: res.data.enable2FA,
                    });
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

    React.useEffect(() => {
        console.log("AUTH in homepage: ", Auth);
    }, [Auth]);

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
