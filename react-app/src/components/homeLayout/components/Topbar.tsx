import axios from "axios";
import { useAuth, useChat, Feature, useFeature } from "context";
import Invitations from "./Invitation";
import HeroMenu from "./HeroMenu";
import { ChatIcon, LockIcon, NoChannelIcon, PlayIcon } from "assets/images";
import "../styles/topbar.scss";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

function Topbar() {
    const { userAuth } = useAuth();
    const { channel } = useChat();
    const { feature } = useFeature();

    function defineTitle() {
        if (feature === Feature.Chat || feature === Feature.Private) {
            return channel.name;
        } else if (feature === Feature.Game) {
            return "Ultimate Pong";
        } else {
            return "Transcendance";
        }
    }


    function test() {
        console.log(channel)
    }
    return (
        <div className="topbar">
            <div className="channel">
                {feature !== Feature.None && (
                    <img
                        className={
                            "channelImg" +
                            (channel.image === ChatIcon || channel.image === PlayIcon
                                ? " icon"
                                : "") +
                            (channel.type !== "private" ? " noradius" : "")
                        }
                        src={channel.image ? channel.image : NoChannelIcon}
                        alt="channel"
                    />
                )}
                {channel.protected && <img className="protected" src={LockIcon} alt="" /> }
                <span className="channelName">{defineTitle()}</span>
            </div>
            <div className="user">
            <button className="button-purple" onClick={test}>Test</button>
                <Invitations />
                <span className="topbar-username">{userAuth.username}</span>
                <HeroMenu />
            </div>
        </div>
    );
}

export { Topbar };
