import { NavLink } from "react-router-dom";
import { Icon } from "../components/Icon";
// import { fetchChatRooms } from "../services/API";
import { style, addSVG, playSVG, sendSVG, publicSVG } from "./index";

export function fetchChatRooms() {
    const jsonArray =
        '[{ "name": "AwesomeGroup", "goTo": "/", "imageURL": "https://d368g9lw5ileu7.cloudfront.net/races/race53618-social1200x630.bAaECm.jpg" },{ "name": "BadGroup", "goTo": "/about", "imageURL":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bad_album_logo.svg/640px-Bad_album_logo.svg.png"}]';
    return JSON.parse(jsonArray);
}
// Navigation Bar visible on the left, after authentification.
export function NavBar() {
    return (
        <div className={style.NavBar_Container}>
            <Feature name="Private message" />
            <div className={style.NavBar_separator}></div>
            <ChatRooms />
            <Feature name="New room" />
            <Feature name="Public rooms" />
            <div className={style.NavBar_separator}></div>
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
    let FeatureStyle = style.NavBar_svg;

    if (name === "Private message") {
        goTo = "/messages";
        svg = sendSVG;
        FeatureStyle = style.NavBar_privateMessage;
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
        <div className={FeatureStyle}>
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
        <div className={style.NavBar_RoomIcon}>
            <NavLink
                to={props.goTo}
                className={({ isActive }) =>
                    isActive
                        ? style.NavBar_activeRoom
                        : style.NavBar_inactiveRoom
                }
            >
                <div className={style.NavBar_wrapper}>
                    <div className={style.NavBar_linkWrapper}>
                        <div className={style.NavBar_activeLink}></div>
                    </div>
                    <div className={style.NavBar_tooltiptext}>{props.name}</div>
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
