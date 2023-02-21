import React from "react";
import Sidebar from "../../components/chat/Sidebar";
import Chat from "../../components/chat/Chat";
import "./style.scss";

type Props = {};

function Home({}: Props) {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home;
