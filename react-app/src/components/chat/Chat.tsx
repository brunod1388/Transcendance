import { useChat } from "../../context";
import Sidebar from "./components/ChannelUsers";
import Feed from "./components/Feed";
import "./styles/chat.scss";

export default function Chat() {
    const { channel } = useChat();
    return (
        <div className="chat">
            <Sidebar />
            {channel.id !== 0 && <Feed />}
        </div>
    );
}
