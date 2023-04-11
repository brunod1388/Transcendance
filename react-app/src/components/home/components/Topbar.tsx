import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "../../../context";
import Invitations from "./Invitation";
import { useSocket, useVisible } from "../../../hooks";
import { ChatInvitationType } from "../../../@types";
import UserMenu from "./UserMenu";
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
                <button className="button-purple" onClick={test}>
                    Test
                </button>
                <span style={{ color: "red" }}>{userAuth.id}</span>{" "}
                <Invitations />
                <UserMenu/>
            </div>
        </div>
    );
}

export { Topbar };
