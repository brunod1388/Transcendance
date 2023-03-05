import React from "react";
import Navbar from "../../components/home/Navbar";
import Topbar from "../../components/home/Topbar";
import Chat from "../../components/chat/Chat";

import "./home.scss";

function Home() {
    return (
        <div className="home">
            <div className="homeContainer">
                <Navbar />
                <div className="mainContainer">
                    <Topbar />
                    <div className="featureContainer">
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
