import { useState } from "react";
import UserMenu from "./UserMenu";
import { NoUserIcon } from "../../../assets/images";
import { UserType } from "../../../@types";
import "../styles/user.scss";

type Props = {
    hasNewMsg?: boolean;
    keyId: string;
    isPrivate?: boolean;
    user: UserType;
};

export default function User(props: Props) {
    const { hasNewMsg = false, keyId, isPrivate = false, user } = props;

    const [selected, setSelected] = useState(false); //use userId when emplemented
    return (
        <div className="userChat" key={keyId}>
            <div
                className="userPlate"
                onClick={() => setSelected(selected ? false : true)}
            >
                <img
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
