import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context";
import { NotificationProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context";
import { FeatureProvider } from "./context/feature.context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
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
    </React.StrictMode>
);
