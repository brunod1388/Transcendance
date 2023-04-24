import { UserMenu, PenalityIcons } from "components/utils/";
import { UserPlateType, UserType } from "@customTypes";
import { useVisible } from "hooks";
import { NoUserIcon } from "assets/images";
import "../styles/userPlate.scss";

type Props = {
    hasNewMsg?: boolean;
    user: UserType;
    type: UserPlateType;
};

export default function UserPlate(props: Props) {
    const { user, type } = props;

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
                        <PenalityIcons user={user} />
                        <div
                            className={
                                "connected " +
                                (user.connected ? (user.inGame ? "inGame" : "on") : "off")
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="menuContainer" ref={ref}>
                {isVisible && <UserMenu user={user} type={type} />}
            </div>
        </div>
    );
}
