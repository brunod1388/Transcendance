import Sidebar from "./components/ChannelUsers";
import Feed from "./components/Feed";
import "./styles/chat.scss";

export default function Chat() {
    return (
        <div className="chat">
            <Sidebar />
            <Feed />
        </div>
    );
}
