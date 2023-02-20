import {
    useRoutes,
    LoginPage,
    PlayPage,
    HomePage,
    SubscribePage,
} from "./index";

export function MyRoutes() {
    const routes = useRoutes([
        { path: "/", element: <LoginPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/subscribe", element: <SubscribePage /> },
        { path: "/home", element: <HomePage /> },
        { path: "/play", element: <PlayPage /> },
    ]);

    return routes;
}
