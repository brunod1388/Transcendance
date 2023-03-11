import {
    PlayIcon,
    SettingIcon,
    AddUserIcon,
    NoUserIcon,
    Bell
} from "../../../assets/images";
import { useNavigate, Link } from "react-router-dom";
import { MouseEvent, useState } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Cookies from "js-cookie";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "../styles/topbar.scss";
import Notification from "./Notification";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

function Topbar() {
    // const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userAuth, updateUser } = useAuth();
    const { removeItem } = useLocalStorage();
    const avatar = userAuth.avatar;
    const { channel } = useChat();
    const {setFeature} = useFeature();
    const [ notif, setNotif] = useState(false);
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
            <span className="channelName">{channel.currentChannelName}</span>
            <div className="user">
                <img
                    className="avatar"
                    src={avatar ? avatar : NoUserIcon}
                    alt=""
                />
                <span>{userAuth.username}</span>
                <div className="notificationContainer">
                    <img
                        className="imgButton"
                        src={Bell}
                        alt=""
                        onClick={() => setNotif(!notif)}
                    />
                    {notif && 
                            <div className="notifications">
                                <span className="title">Invitation</span>
                                <Notification type="friend" name="name1"></Notification>
                                <Notification type="friend" name="name2"></Notification>
                                <Notification type="channel" name="name1"></Notification>
                                <Notification type="channel" name="name2"></Notification>
                            </div>
                    }
                    </div>
                <img
                    className="imgButton"
                    src={PlayIcon}
                    alt=""
                    onClick={() => setFeature(Feature.Pong)}
                />
                <img
                    className="imgButton"
                    src={SettingIcon}
                    alt=""
                    onClick={() => setFeature(Feature.Setting)}
                />
                <button className="button-purple" onClick={logout}>
                    logout
                </button>
            </div>
        </div>
    );
}

export { Topbar };