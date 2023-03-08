import React from "react";

import {
    PlayIcon,
    SettingIcon,
    AddUserIcon,
    NoUserIcon,
} from "../../assets/images";
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
    const avatar = userAuth.avatar;
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
                <img
                    className="avatar"
                    src={avatar ? avatar : NoUserIcon}
                    alt=""
                />
                <span>{userAuth.username}</span>
                <img className="imgButton" src={PlayIcon} alt="" />
                <img className="imgButton" src={AddUserIcon} alt="" />
                <img className="imgButton" src={SettingIcon} alt="" />
                <button className="button-purple" onClick={logout}>
                    logout
                </button>
            </div>
        </div>
    );
}
