import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import PlayPage from "./pages/PlayPage/PlayPage";
import PublicGroupPage from "./pages/PublicGroupPage/PublicGroupPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";


function App() {
	return (
	<div className="app">
	<Routes>
		<Route path="/" element={<HomePage/>} />
		<Route path="/about" element={<AboutPage/>} />
		<Route path="/group" element={<GroupPage/>} />
		<Route path="/login" element={<LoginPage/>} />
		<Route path="/messages" element={<MessagesPage/>} />
		<Route path="/play" element={<PlayPage/>} />
		<Route path="/public" element={<PublicGroupPage/>} />
		<Route path="/settings" element={<SettingsPage/>} />
	</Routes>
	</div>
	);
}

export default App;
