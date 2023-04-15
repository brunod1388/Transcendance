import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Invitations from "./Invitation";
import { useSocket, useVisible } from "../../../hooks";
import { ChatInvitationType } from "../../../@types";
import HeroMenu from "./HeroMenu";
import { ChatIcon, PlayIcon } from "../../../assets/images";
import "../styles/topbar.scss";

axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

function Topbar() {
    const { userAuth } = useAuth();
    const { channel } = useChat();
    const { feature } = useFeature();
    const [socket] = useSocket();

    //useEffect(() => {
    //    console.log("Auth user: ", userAuth);
    //}, [userAuth]);

    //useEffect(() => {
    //    console.log("Auth token: ", token);
    //}, [token]);

    function test(e: MouseEvent<HTMLButtonElement>) {
        socket.emit("test", { id: userAuth.id }, (res: any) => {
            console.log("test response :", res);
        });
    }
    function defineTitle() {
        if (feature === Feature.Chat || feature === Feature.Private) {
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
                {feature !== Feature.None && (
                    <img
                        // className={"channelImg" + ((channel.image === Feature.Private || channel.image === Feature.Game) ? " icon":"")}
                        className={
                            "channelImg" +
                            (channel.image === ChatIcon ||
                            channel.image === PlayIcon
                                ? " icon"
                                : "")
                        }
                        src={channel.image}
                    />
                )}
                <span className="channelName">{defineTitle()}</span>
                <span style={{ color: "red" }}>{channel.id}</span>
            </div>
            <div className="user">
                <button className="button-purple" onClick={test}>
                    Test
                </button>
                <span style={{ color: "red" }}>{userAuth.id}</span>{" "}
                <Invitations />
                <HeroMenu />
            </div>
        </div>
    );
}

export { Topbar };
