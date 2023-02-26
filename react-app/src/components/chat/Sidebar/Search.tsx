import React from "react";
import User from "./User";

export default function Search() {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="type a user" />
            </div>
            <User keyId="searchUser"/>
        </div>
    );
}
