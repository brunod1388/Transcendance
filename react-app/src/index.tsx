import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { AuthProvider } from "./context";
import { SocketProvider, NotificationProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/test-context"; //for testing purpose

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <SocketProvider>
            <BrowserRouter>
                <AuthProvider>
                    <NotificationProvider>
                        <UserProvider>
                            {" "}
                            {/* testing purpose */}
                            <App />
                        </UserProvider>
                    </NotificationProvider>
                </AuthProvider>
            </BrowserRouter>
        </SocketProvider>
    </React.StrictMode>
);
