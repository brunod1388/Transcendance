import { Delete, Edit, NoUserIcon } from "../../../assets/images";
import { MessageType } from "../../../@types";
import "../styles/message.scss";

interface Props {
    owner?: boolean;
    message: MessageType;
    next: MessageType | undefined;
}

const DAY_TIME = 1000 * 60 * 60 * 24;
const HOUR_TIME = 1000 * 60 * 60;

function getDateMsg(date: Date): string {
    const now = new Date();

    if (
        date.getFullYear() === now.getFullYear() ||
        date.getMonth() === now.getMonth()
    ) {
        if (date.getDate() === now.getDate()) return "Today at";
        if (date.getDate() === now.getDate() - 1) return "Yesterday at";
    }
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 2000}`;
}

function getTimeStr(date: Date, withSeconds: boolean): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    let time = `${hoursStr}:${minutesStr}`;
    if (withSeconds) time += `:${secondsStr}`;
    return time;
}

function stickToPrev(msg: MessageType, next: MessageType): boolean {
    if (msg.creator.id !== next.creator.id) return false;
    const d1 = new Date(msg.createdAt);
    const d2 = new Date(next.createdAt);
    if (d1.getTime() - d2.getTime() > HOUR_TIME) return false;
    return true;
}

export default function Message(props: Props) {
    const { owner = false, message, next } = props;
    const avatar = message.creator.avatar;
    const date = new Date(message.createdAt);
    const stick = next !== undefined ? stickToPrev(message, next) : false;

    return (
        <div
            className={
                "messageContainer " + (stick ? "stick" : "normalMessage")
            }
        >
            <img
                className="avatar"
                src={avatar === undefined ? NoUserIcon : avatar}
                alt=""
            />
            <div className="message">
                <div className="details">
                    <span className="username">{message.creator.username}</span>
                    <div className="time">
                        <span className="day">{getDateMsg(date)}</span>
                        <span className="hour">{getTimeStr(date, !stick)}</span>
                    </div>
                </div>
                <div className="messageContent">
                    <p>{message.content}</p>
                </div>
            </div>
            {owner && (
                <div className="messageMenu">
                    <div>
                        <img className="edit" src={Edit} alt="" />
                    </div>
                    <div>
                        <img className="delete" src={Delete} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
}
