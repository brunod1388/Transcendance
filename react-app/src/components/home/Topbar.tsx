import React from "react";
import avatar from "../../assets/images/smile.png";
import setting from "../../assets/images/setting.png";
import play from "../../assets/images/play2.png";
import addContact from "../../assets/images/add-user.png";
import "./home.scss";

import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
// import { useContext } from "react";
//import avatar from "../../../assets/images/smile.png";
import axios from "axios";
import { useAuth } from "../../context";
//import { defaultUser } from "../../../@types";
import Cookies from "js-cookie";
import { useLocalStorage } from "../../hooks/useLocalStorage";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

export default function Topbar() {
    // const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userAuth, updateUser } = useAuth();
    const { removeItem } = useLocalStorage();

    //useEffect(() => {
    //    console.log("Auth user: ", userAuth);
    //}, [userAuth]);

    //useEffect(() => {
    //    console.log("Auth token: ", token);
    //}, [token]);

    function logout(e: MouseEvent<HTMLButtonElement>) {
        removeItem("user");
        Cookies.remove("JWTtoken", { sameSite: "none", secure: true });
        updateUser();
        navigate("/login");
    }

    return (
        <div className="topbar">
            <span className="channelName">ChannelName</span>
            <div className="user">
                <img className="avatar" src={userAuth.avatar} alt="" />
                <span>{userAuth.username}</span>
                <img className="imgButton" src={play} alt="" />
                <img className="imgButton" src={addContact} alt="" />
                <img className="imgButton" src={setting} alt="" />
                <button className="button-purple" onClick={logout}>
                    logout
                </button>
            </div>
        </div>
    );
}
