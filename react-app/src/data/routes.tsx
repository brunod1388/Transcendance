import React from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import MessagePage from "../pages/MessagePage";
import GroupPage from "../pages/GroupPage";
import PlayPage from "../pages/PlayPage";
import PublicPage from "../pages/PublicPage";
import SettingPage from "../pages/SettingPage";
import SubscribePage from "../pages/SubscribePage";
import HomePage from "../pages/HomePage";

function MyRoutes() {
    const routes = useRoutes([
        { path: "/", element: <LoginPage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/group", element: <GroupPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/messages", element: <MessagePage /> },
        { path: "/play", element: <PlayPage /> },
        { path: "/public", element: <PublicPage /> },
        { path: "/settings", element: <SettingPage /> },
        { path: "/subscribe", element: <SubscribePage /> },
        { path: "/home", element: <HomePage /> },
    ]);

    return routes;
}

export default MyRoutes;
