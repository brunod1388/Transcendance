import Cookies from "js-cookie";
import MenuButton from "./MenuButton";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useChat } from "context";
import { useLocalStorage } from "hooks/useLocalStorage";
import { LogoutIcon, NoUserIcon, SettingIcon } from "assets/images";
import { useSocket, useVisible } from "hooks";
import { MatchSummary, initialSummary } from "@customTypes/match.types";
import "../styles/heromenu.scss";
import UserDetails from "components/utils/components/UserDetails";

export default function HeroMenu() {
    const navigate = useNavigate();
    const { userAuth, updateUser } = useAuth();
    const { removeItem } = useLocalStorage();
    const { updateChannel } = useChat();
    const avatar = userAuth.avatar;
    const { isVisible, setIsVisible, ref } = useVisible(false);
    const [socket] = useSocket();

    const [matchSummary, setMatchSummary] = useState(initialSummary);

    useEffect(() => {
        socket.emit("getMatchSummary", userAuth.id);
        socket.on("matchSummary", (data: MatchSummary) => setMatchSummary(data));
        return () => {
            socket.off("matchSummary");
        };
    }, []);

    function logout(e: MouseEvent<HTMLButtonElement>) {
        if (socket !== undefined) {
            console.log("Logout event triggered");
            socket.disconnect();
        }
        removeItem("user");
        //Cookies.remove("JWTtoken", { sameSite: "none", secure: true });
        Cookies.remove("JWTtoken", { sameSite: "lax" });
        updateUser();
        updateChannel();
        navigate("/login");
    }

    return (
        <div className="hero" ref={ref}>
            <img
                className="avatar pulse"
                src={avatar ? avatar : NoUserIcon}
                onClick={() => setIsVisible(!isVisible)}
                alt=""
            />
            {isVisible && (
                <div className="hero-menu-wrap">
                    <div className="menu">
                        <div className="user-info">
                            <img className="avatar" src={avatar ? avatar : NoUserIcon} alt="" />
                            <span className="username">{userAuth.username}</span>
                        </div>
                        <UserDetails matchSummary={matchSummary} />
                        <div className="menu">
                            <div className="button-wrap">
                                <MenuButton
                                    filter={true}
                                    name="Settings"
                                    image={SettingIcon}
                                    isChannel={false}
                                    onClick={() => navigate("/settings")}
                                    arrow={true}
                                />
                            </div>
                            <div className="button-wrap">
                                <MenuButton
                                    filter={true}
                                    name="Logout"
                                    image={LogoutIcon}
                                    isChannel={false}
                                    onClick={logout}
                                    arrow={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
