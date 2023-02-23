import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { SocketProvider, NotificationProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <SocketProvider>
            <BrowserRouter>
                <NotificationProvider>
                    <App />
                </NotificationProvider>
            </BrowserRouter>
        </SocketProvider>
    </React.StrictMode>
);
