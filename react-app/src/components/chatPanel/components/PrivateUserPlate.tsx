import { UserMenu, BurgerMenu, PenalityIcons } from "components/utils";
import { useChat, useAuth, ChannelDetailsType } from "context";
import { UserPlateType, UserType } from "@customTypes";
import { NoUserIcon } from "assets/images";
import { useSocket } from "hooks";
import { useEffect } from "react";
import "../styles/privateUserPlate.scss";

type Props = {
    hasNewMsg?: boolean;
    user: UserType;
    type: UserPlateType;
    selected: boolean;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export default function PrivateUserPlate(props: Props) {
    const { hasNewMsg = false, user, type, selected, setSelected } = props;
    const { channel, updateChannel } = useChat();
    const { userAuth } = useAuth();
    const [socket] = useSocket();

    function joinRoom(channel: ChannelDetailsType) {
        socket.emit("joinRoom", { userid: userAuth.id, channelid: channel.id });
    }

    function leaveRoom() {
        socket.emit("leaveRoom", {
            userid: userAuth.id,
            channelid: channel.id,
        });
        channel.room = "";
    }

    function selectUser() {
        setSelected(Number(user.channelId));
        leaveRoom();
        const newChannel = {
            id: Number(user.channelId),
            name: "Private Message - " + props.user.username,
            type: "private",
            rights: "admin",
            room: String(user.room),
            image: String(user.avatar),
            protected: false,
        };
        updateChannel(newChannel);
        joinRoom(newChannel);
    }

    function toggleMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) {
        e.preventDefault();
        const menu = document.getElementById(`menu${id}`);
        if (menu) menu.classList.add("show");
        const plate = document.getElementById(`plate${id}`);
        if (plate) plate.classList.add("selected");
    }
    function handleClickOutsideMenu(event: MouseEvent, id: number) {
        const menu = document.getElementById(`menu${id}`);
        if (menu && !menu.contains(event.target as Node)) menu.classList.remove("show");
        const plate = document.getElementById(`plate${id}`);
        if (plate && !plate.contains(event.target as Node)) plate.classList.remove("selected");
    }

    useEffect(() => {
        document.addEventListener("click", (e) => handleClickOutsideMenu(e, user.id), true);
        return () =>
            document.removeEventListener("click", (e) => handleClickOutsideMenu(e, user.id), true);
    }, []);

    return (
        <div className={"private-user" + (selected ? " selected" : "")}>
            <div className="userPlate" onClick={selectUser}>
                <img src={user.avatar === "" ? NoUserIcon : user.avatar} alt="avatar" />
                <div className="details">
                    <div className="line">
                        <span className="username">{user.username}</span>
                        <span style={{ color: "red" }}>{user.id}</span>
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
                    <div className="line">
                        {hasNewMsg || (true && <p className="last-message">last message</p>)}
                        <BurgerMenu onClick={(e) => toggleMenu(e, user.id)} />
                    </div>
                </div>
            </div>
            <div className="private-menu" id={`menu${user.id}`}>
                <UserMenu user={user} type={type} isPrivate={true} />
            </div>
        </div>
    );
}
