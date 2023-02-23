import React from "react";
import Sidebar from "../../components/chat/Sidebar";
import Navbar from "../../components/chat/Navbar";
import Chat from "../../components/chat/Chat";

import "./home.scss";

function Home() {
    return (
        <div className="home">
            <div className="container">
                <Navbar />
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home;
