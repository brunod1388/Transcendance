import UserMenu from "./UserMenu";
import { NoUserIcon } from "../../../assets/images";
import { UserPlateType, UserType } from "../../../@types";
import "../styles/userPlate.scss";
import { useVisible } from "../../../hooks";

type Props = {
    hasNewMsg?: boolean;
    user: UserType;
    type: UserPlateType;
};

export default function UserPlate(props: Props) {
    const { hasNewMsg = false, user, type } = props;
    const { ref, isVisible, setIsVisible } = useVisible(false);

    return (
        <div className={"userChat"}>
            <div className={"userPlate "} onClick={() => setIsVisible(true)}>
                <img
                    className={isVisible ? "bigAvatar" : ""}
                    src={user.avatar === "" ? NoUserIcon : user.avatar}
                />
                <div className="userChatInfo">
                    <span>{user.username}</span>
                    {type === "direct" && hasNewMsg && <p>last message</p>}
                </div>
                {user.connected && (
                    <div className="newMessage">
                        <span />
                    </div>
                )}
            </div>
            <div className="menuContainer" ref={ref}>
                {isVisible && <UserMenu user={user} type={type} />}
            </div>
        </div>
    );
}
