import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import PlayPage from "./pages/PlayPage/PlayPage";
import PublicGroupPage from "./pages/PublicGroupPage/PublicGroupPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { io, Socket } from "socket.io-client";
const SERVER_URL = "http://localhost:3000";
const socket: Socket = io(SERVER_URL);

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/public" element={<PublicGroupPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </div>
    );
}
export { socket, App };
export default App;
