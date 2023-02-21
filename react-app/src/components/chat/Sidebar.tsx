import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

type Props = {};

export default function Sidebar({}: Props) {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}
