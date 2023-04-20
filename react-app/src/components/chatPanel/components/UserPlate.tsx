import UserMenu from "./UserMenu";
import { NoUserIcon } from "assets/images";
import { UserPlateType, UserType } from "@customTypes";
import { useVisible } from "hooks";
import { MutedIcon, BlockedIcon } from "components/utils/penalityIcon";
import "../styles/userPlate.scss";

type Props = {
    hasNewMsg?: boolean;
    user: UserType;
    type: UserPlateType;
};

export default function UserPlate(props: Props) {
    const { user, type } = props;
    const tomorrow = new Date(2023, 3, 22, 0, 0, 0, 0);
    user.endBlock = tomorrow;
    user.endMute = tomorrow;
    const { ref, isVisible, setIsVisible } = useVisible(false);
    return (
        <div className={"userChat" + (isVisible ? " selected" : "")}>
            <div className={"userPlate "} onClick={() => setIsVisible(true)}>
                <img
                    className={"avatar" + (isVisible ? " bigAvatar" : "")}
                    src={user.avatar === "" ? NoUserIcon : user.avatar}
                    alt="avatar"
                />
                <div className="details">
                    <div className="username">{user.username}</div>
                    <div className="status">
                        {user.endMute !== undefined && <MutedIcon endMute={user.endMute} />}
                        {user.endBlock !== undefined && <BlockedIcon endBlock={user.endBlock} />}
                        <div className={"connected " + (user.connected ? "on" : "off")} />
                    </div>
                </div>
            </div>
            <div className="menuContainer" ref={ref}>
                {isVisible && <UserMenu user={user} type={type} />}
            </div>
        </div>
    );
}
