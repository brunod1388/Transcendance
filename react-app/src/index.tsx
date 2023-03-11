import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context";
import { SocketProvider, NotificationProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context";
import { FeatureProvider } from "./context/feature.context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <SocketProvider>
            <BrowserRouter>
                <AuthProvider>
                    <NotificationProvider>
                        <ChatProvider>
                            <FeatureProvider>
                                <App />
                            </FeatureProvider>
                        </ChatProvider>
                    </NotificationProvider>
                </AuthProvider>
            </BrowserRouter>
        </SocketProvider>
    </React.StrictMode>
);
