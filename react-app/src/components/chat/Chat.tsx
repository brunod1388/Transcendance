import { useChat } from "../../context";
import ChannelUsers from "./components/ChannelUsers";
import Feed from "./components/Feed";
import PrivateUsers from "./components/PrivateUsers";
import "./styles/chat.scss";

export default function Chat() {
    const { channel } = useChat();
    return (
        <div className="chat">
            {channel.type === "channel" ? <ChannelUsers /> : <PrivateUsers />}
            {channel.id !== 0 && <Feed />}
        </div>
    );
}
