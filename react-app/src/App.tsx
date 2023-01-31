import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import PlayPage from "./pages/PlayPage/PlayPage";
import PublicGroupPage from "./pages/PublicGroupPage/PublicGroupPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SubscribePage from "./pages/SubscribePage/SubscribePage";


function App() {
	return (
		<div className="app">
		<Routes>
			<Route path="/" element={<LoginPage/>} />
			<Route path="/subscribe" element={<SubscribePage/>} />
			<Route path="/messages" element={<MessagesPage/>} />
			<Route path="/play" element={<PlayPage/>} />
			<Route path="/settings" element={<SettingsPage/>} />
			<Route path="/about" element={<AboutPage/>} />
			<Route path="/group" element={<GroupPage/>} />
			<Route path="/public" element={<PublicGroupPage/>} />
			{/* <Route path="/login" element={<LoginPage/>} /> */}
		</Routes>
		</div>
	);
}

export default App;
