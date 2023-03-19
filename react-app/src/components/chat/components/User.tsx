import { useState } from "react";
import UserMenu from "./UserMenu";
import { NoUserIcon } from "../../../assets/images";
import { UserPlateType, UserType } from "../../../@types";
// import "../styles/user.scss";
import "../styles/user.scss";

type Props = {
    hasNewMsg?: boolean;
    user: UserType;
    onClick: () => void;
    selected: boolean;
    type: UserPlateType;
};

export default function User(props: Props) {
    const {
        hasNewMsg = false,
        user,
        onClick,
        selected,
        type
    } = props;

    return (
        <div
            className={"userChat " + (selected ? "selected" : "")}
        >
            <div
                className={"userPlate " + (selected ? "selected" : "")}
                onClick={onClick}
            >
                <img
                    className={selected ? "selected" : ""}
                    src={user.avatar === "" ? NoUserIcon : user.avatar}
                    alt=""
                />
                <div className="userChatInfo">
                    <span>{user.username}</span>
                    {type === "direct" && hasNewMsg && <p>last message</p>}
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
                <UserMenu user={user} type={type}/>
            </div>
        </div>
    );
}
