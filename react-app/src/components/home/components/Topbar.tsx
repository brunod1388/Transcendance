import {
    PlayIcon,
    SettingIcon,
    AddUserIcon,
    NoUserIcon,
} from "../../../assets/images";
import { useNavigate, Link } from "react-router-dom";
import { MouseEvent } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Cookies from "js-cookie";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "../styles/topbar.scss";

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