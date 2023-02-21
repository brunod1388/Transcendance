import React from "react";
import Middlebar from "../../components/chat/Middlebar";
import Navbar from "../../components/chat/Navbar";
import Chat from "../../components/chat/Chat";
import "./style.scss";

type Props = {};

function Home({}: Props) {
    return (
        <div className="home">
            <div className="container">
                <Navbar />
                <Middlebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home;
