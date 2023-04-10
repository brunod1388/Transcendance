import {
    PlayIcon,
    SettingIcon,
    NoUserIcon,
    BellIcon,
    NoChannelIcon,
    LogoutIcon,
} from "../../../assets/images";
import { Link } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Invitations from "./Invitation";
import { useSocket, useVisible } from "../../../hooks";
import { ChatInvitationType } from "../../../@types";
import "../styles/topbar.scss";
import UserMenu from "./UserMenu";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

function Topbar() {
    const { userAuth } = useAuth();
    const { channel } = useChat();
    const { feature } = useFeature();
    const [notif, setNotif] = useState(false);
    const [socket] = useSocket();
    const [invitations, setInvitations] = useState<ChatInvitationType[]>([]);

    //useEffect(() => {
    //    console.log("Auth user: ", userAuth);
    //}, [userAuth]);

    //useEffect(() => {
    //    console.log("Auth token: ", token);
    //}, [token]);

    useEffect(() => {
        socket.emit(
            "getPendings",
            { userId: userAuth.id },
            (res: ChatInvitationType[]) => {
                console.log("pendings: ", res);
                setInvitations(
                    res.map((i: ChatInvitationType) => {
                        if (i.image === "")
                            i.image =
                                i.type === "Friend"
                                    ? NoUserIcon
                                    : NoChannelIcon;
                        return i;
                    })
                );
                if (res.length > 0) setNotif(true);
            }
        );
        socket.on("pendings", (invitation: ChatInvitationType) => {
            setNotif(true);
            setInvitations((state) => [...state, invitation]);
        });
        return () => {
            socket.off("pendings");
        };
    }, [socket, setInvitations]);



    function test(e: MouseEvent<HTMLButtonElement>) {
        socket.emit("test", { id: userAuth.id }, (res: any) => {
            console.log("test response :", res);
        });
    }
    function defineTitle() {
        console.log("salut")
        console.log(feature)
        if (feature === Feature.Chat) {
            return channel.name;
        } else if (feature === Feature.Game) {
            return "Ultimate Pong";
        } else {
            return "Transcendance";
        }
    }
    return (
        <div className="topbar">
            <div className="channel">
                <img className="channelImg" src={channel.image} alt="" />
                <span className="channelName">
                    {defineTitle()}
                </span>
                <span style={{ color: "red" }}>{channel.id}</span>
            </div>
            <div className="user">
                {/* <button className="button-purple" onClick={test}>
                    Test
                </button>
                <span style={{ color: "red" }}>{userAuth.id}</span>{" "} */}
                {/* <div className="invitationContainer" id="notif">

                    {notif && <img className="imgInvitation" src={BellIcon} />}
                    <div className="invitations" ref={ref}>
                        {isVisible && (
                            <Invitations
                                invitations={invitations}
                                setInvitations={setInvitations}
                                setNotif={setNotif}
                            />
                        )}
                    </div>
                </div> */}
                <UserMenu/>
                
            </div>
        </div>
    );
}

export { Topbar };
