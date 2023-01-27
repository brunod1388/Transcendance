import React from "react";
import { Layout } from "./index";
import "./MessagesPage.css";
import Chat from "../../components/Chat/Chat";

function MessagesPage() {
    return (
        <Layout>
            <h1>Messages Page</h1>
            <Chat />
        </Layout>
    );
}

export default MessagesPage;
