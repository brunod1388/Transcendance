import React from "react";
import TopMiddlebar from "./TopMiddlebar";
import Search from "./Search";
import Chats from "./Chats";

type Props = {};

export default function Middlebar({}: Props) {
    return (
        <div className="middleBar">
            <TopMiddlebar />
            <Search />
            <Chats />
        </div>
    );
}
