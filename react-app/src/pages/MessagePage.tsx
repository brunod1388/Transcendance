import { Layout } from "../layouts/Layout";
import style from "../assets/styles/pages.module.css";
import { Chat } from "../features/chat/component/Chat";
import { roomSample } from "../features/chat/data/room-sample";

function MessagesPage() {
    return (
        <Layout>
            {/* <h1>Messages Page</h1>
			<p className="subtitle">Play</p> */}
            <div className={style.chat_container}>
                <div className={style.toolbar_container}>
                    <h4>#{roomSample.roomName}</h4>
                </div>
                <Chat room={roomSample} />
            </div>
        </Layout>
    );
}

export default MessagesPage;
