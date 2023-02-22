import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { SocketProvider } from "./context/socket-context";
import { UserProvider } from "./context/test-context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <SocketProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </SocketProvider>
    </React.StrictMode>
);
