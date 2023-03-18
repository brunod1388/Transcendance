import { useState } from "react";
import UserMenu from "./UserMenu";
import { NoUserIcon } from "../../../assets/images";
import { UserType } from "../../../@types";
// import "../styles/user.scss";
import "../styles/user.scss";

type Props = {
    hasNewMsg?: boolean;
    isPrivate?: boolean;
    user: UserType;
    onClick: () => void;
    selected: boolean;
};

export default function User(props: Props) {
    const {
        hasNewMsg = false,
        isPrivate = false,
        user,
        onClick,
        selected,
    } = props;

    return (
        <div className={"userChat " + (selected ? "selected" : "")} onClick={onClick}>
            <div className={"userPlate " + (selected ? "selected" : "")} onClick={onClick}>
                <img className={selected ? "selected" : ""}
                    src={user.avatar === "" ? NoUserIcon : user.avatar}
                    alt=""
                />
                <div className="userChatInfo">
                    <span>{user.username}</span>
                    {isPrivate && hasNewMsg && <p>last message</p>}
                </div>
                {hasNewMsg && (
                    <div className="newMessage">
                        <span />
                    </div>
                )}
            </div>
            <div
                className="menuContainer"
                style={!selected ? { display: "none" } : {}}
            >
                <UserMenu />
            </div>
        </div>
    );
}
