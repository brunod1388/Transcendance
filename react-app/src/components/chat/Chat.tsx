import Sidebar from "./components/Sidebar";
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
