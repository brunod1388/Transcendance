import {
    PlayIcon,
    SettingIcon,
    AddUserIcon,
    NoUserIcon,
    Bell,
} from "../../../assets/images";
import { useNavigate, Link } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Cookies from "js-cookie";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "../styles/topbar.scss";
import Invitation from "./Invitation";
import { useSocket } from "../../../hooks";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

interface invitationType {
    invitationId: number;
    type: "Friend" | "Channel";
    name: string;
}

function Topbar() {
    // const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userAuth, updateUser } = useAuth();
    const { removeItem } = useLocalStorage();
    const avatar = userAuth.avatar;
    const { channel } = useChat();
    const { setFeature } = useFeature();
    const [notif, setNotif] = useState(false);
    const [invitations, setInvitations] = useState<invitationType[]>([]);
    const [socket] = useSocket();
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

    useEffect(() => {
        // socket.emit("getFriends", userAuth.id, true, (res: any) => {
        //     console.log(res);
        // })
        socket.emit("getChannelsPending", userAuth.id, (res: any) => {
            console.log(res);
            console.log(
                res.map((channelUser: any) => ({
                    id: channelUser.channel.id,
                    type: "Channel",
                    name: channelUser.channel.name,
                }))
            );
            const channelInvitations = res.map((channelUser: any) => ({
                id: channelUser.channel.id,
                type: "Channel",
                name: channelUser.channel.name,
            }));
            // setInvitations([...invitations, channelInvitations]);
            console.log("TEST  :", [...invitations, channelInvitations]);
        });
    }, []);

    return (
        <div className="topbar">
            <span className="channelName">{channel.currentChannelName}</span>
            <div className="user">
                <img
                    className="avatar"
                    src={avatar ? avatar : NoUserIcon}
                    alt=""
                />
                <span style={{ color: "red" }}>{userAuth.id}</span>{" "}
                {/* test purpose*/}
                <span>{userAuth.username}</span>
                <div className="invitationContainer">
                    <img
                        className="imgButton"
                        src={Bell}
                        alt=""
                        onClick={() => setNotif(!notif)}
                    />
                    {notif && (
                        <div className="invitations">
                            <span className="title">Invitation</span>
                            {invitations.map((invite) => (
                                <Invitation
                                    id={invite.invitationId}
                                    type={invite.type}
                                    name={invite.name}
                                />
                            ))}
                            {/* <Invitation
                                id={3}
                                type="Friend"
                                name="name1"
                            ></Invitation>
                            <Invitation
                                id={3}
                                type="Friend"
                                name="name2"
                            ></Invitation>
                            <Invitation
                                id={3}
                                type="Channel"
                                name="name1"
                            ></Invitation>
                            <Invitation
                                id={3}
                                type="Channel"
                                name="name2"
                            ></Invitation> */}
                        </div>
                    )}
                </div>
                <img
                    className="imgButton"
                    src={PlayIcon}
                    alt=""
                    onClick={() => setFeature(Feature.Pong)}
                />
                {/* <img
                    className="imgButton"
                    src={SettingIcon}
                    alt=""
                    onClick={() => <Link></Link>
                    }
                /> */}
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
