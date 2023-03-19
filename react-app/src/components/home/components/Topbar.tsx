import {
    PlayIcon,
    SettingIcon,
    NoUserIcon,
    Bell,
} from "../../../assets/images";
import { useNavigate, Link } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Cookies from "js-cookie";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import Invitations from "./Invitation";
import "../styles/topbar.scss";
import { useVisible } from "../../../hooks";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

function Topbar() {
    const navigate = useNavigate();
    const { userAuth, updateUser } = useAuth();
    const { removeItem } = useLocalStorage();
    const avatar = userAuth.avatar;
    const { channel, updateChannel } = useChat();
    const { setFeature } = useFeature();
    const [notif, setNotif] = useState(false);
    const { ref, isVisible, setIsVisible } = useVisible(false);
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
        updateChannel();
        navigate("/login");
    }

    return (
        <div className="topbar">
            <div className="channel">
                <img className="channelImg" src={channel.image} alt="" />
                <span className="channelName">{channel.name}</span>
                <span style={{ color: "red" }}>{channel.id}</span>
            </div>
            <div className="user">
                <span style={{ color: "red" }}>{userAuth.id}</span>{" "}
                <img
                    className="avatar"
                    src={avatar ? avatar : NoUserIcon}
                    alt=""
                />
                {/* test purpose*/}
                <span>{userAuth.username}</span>
                <div className="invitationContainer" id="notif">
                    <img
                        className="imgButton"
                        src={Bell}
                        alt=""
                        onClick={() => setIsVisible(!isVisible)}
                    />
                    <div className="invitations" ref={ref}>
                        {isVisible && <Invitations />}
                    </div>
                </div>
                <img
                    className="imgButton"
                    src={PlayIcon}
                    alt=""
                    onClick={() => setFeature(Feature.Pong)}
                />
                <Link to="/settings">
                    <img className="imgButton" src={SettingIcon} alt="" />
                </Link>
                <button className="button-purple" onClick={logout}>
                    logout
                </button>
            </div>
        </div>
    );
}

export { Topbar };
