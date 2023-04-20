import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context";
import { NotificationProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import { FeatureProvider } from "./context/feature.context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    <FeatureProvider>
                        <App />
                    </FeatureProvider>
                </NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
