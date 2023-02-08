import {
    useRoutes,
    LoginPage,
    AboutPage,
    GroupPage,
    MessagePage,
    PlayPage,
    PublicPage,
    SettingPage,
    HomePage,
    SubscribePage,
} from "./index";

export function MyRoutes() {
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
