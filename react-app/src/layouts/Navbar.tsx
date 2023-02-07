import { NavLink } from "react-router-dom";
import { Icon } from "../components/Icon";
import { fetchChatRooms } from "../services/API";
import style from "../assets/styles/NavBar.module.css";
import { addSVG, playSVG, sendSVG, publicSVG } from "./index";

// Navigation Bar visible on the left, after authentification.
export function NavBar() {
    return (
        <div className={style.NavBar}>
            <Feature name="Private message" />
            <div className={style.separator}></div>
            <ChatRooms />
            <Feature name="New room" />
            <Feature name="Public rooms" />
            <div className={style.separator}></div>
            <Feature name="Play" />
        </div>
    );
}

interface FeatureProps {
    name: string;
}
// Same shape as a RoomIcon but providing functionality
function Feature({ name }: FeatureProps) {
    let goTo: string;
    let svg: string;

    if (name === "Private message") {
        goTo = "/messages";
        svg = sendSVG;
    } else if (name === "New room") {
        goTo = "/about";
        svg = addSVG;
    } else if (name === "Public rooms") {
        goTo = "/public";
        svg = publicSVG;
    } else if (name === "Play") {
        goTo = "/play";
        svg = playSVG;
    } else return null;
    return (
        <div className={goTo === "/messages" ? style.msg : style.svg}>
            <RoomIcon name={name} goTo={goTo} imageURL={svg} />
        </div>
    );
}

interface Props {
    goTo: string;
    name: string;
    imageURL: string;
}

// Displays a list of all the chat rooms the user is in.
function ChatRooms() {
    const list = fetchChatRooms();
    return (
        <>
            {list.map((index: Props, key: number) => (
                <div key={key}>
                    <RoomIcon
                        goTo={index.goTo}
                        name={index.name}
                        imageURL={index.imageURL}
                    />
                </div>
            ))}
        </>
    );
}

// Icon of each room, on mouse-hover the name are displayerd in a tooltip
function RoomIcon(props: Props) {
    return (
        <div className={style.Group}>
            <NavLink
                to={props.goTo}
                className={({ isActive }) =>
                    isActive ? style.activeRoom : style.inactiveRoom
                }
            >
                <div className={style.wrapper}>
                    <div className={style.test}>
                        <div className={style.activeLink}></div>
                    </div>
                    <div className={style.tooltiptext}>{props.name}</div>
                    <Icon imageURL={props.imageURL} />
                </div>
            </NavLink>
        </div>
    );
}

RoomIcon.defaultProps = {
    name: "test",
    imageURL:
        "https://www.citypng.com/public/uploads/preview/hd-css3-round-logo-icon-transparent-png-11662224253zt2ubozvzc.png",
};
