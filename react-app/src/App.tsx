import "./App.css";
import React from "react";
import { io, Socket } from "socket.io-client";
import { EventLayer } from "./components/pong/EventLayer/EventLayer";
import { ThemeProvider } from "./context/theme-context";

import { PropsWithChildren } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MessagePage from "./pages/MessagePage";
import PlayPage from "./pages/PlayPage";
import SubscribePage from "./pages/SubscribePage";
import TestPage from "./pages/TestPage";

const SERVER_URL = "http://localhost:3000";
const socket: Socket = io(SERVER_URL);

function App() {
    // in the future use this to be sur to not access to the chat if no authentified
    // const { currentUser} = useContext(AuthContext);

    function ProtectedRoute(props: PropsWithChildren<any>): any {
        if (false) {
            /*if (!currentUser)*/
        }
        return <Navigate to="/login" />;
        return props.children;
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <MessagePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route index element={<LoginPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="suscribe" element={<SubscribePage />} />
                        <Route path="home" element={<MessagePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* {MyRoutes()}
            <EventLayer /> */}
        </div>
    );
}
export { socket, App };
export default App;

// import React from "react";

// import Switch from "./Switch";
// import Card from "./Card";
// import "./assets/styles/index.css";

// export default function App() {
//     return (
//         <div className="App">
//             <h1>React context api</h1>
//             <h2>Theme switch</h2>
//             <Card />
//             <Switch />
//         </div>
//     );
// }

// export { socket, App };
// export default App;
