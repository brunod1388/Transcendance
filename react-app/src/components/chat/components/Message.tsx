import { NoUserIcon } from "../../../assets/images";
import { MessageType } from "../../../@types";
import "../styles/message.scss";

interface Props {
    owner?: boolean;
    message: MessageType;
}

export default function Message(props: Props) {
    const { owner = false, message } = props;
    const avatar = message.creator.avatar;
    const date = new Date(message.createdAt);

    return (
        <div className={"message" + (owner ? " owner" : "")}>
            <div className="messageInfo">
                <img src={avatar === undefined ? NoUserIcon : avatar} alt="" />
                <span className="date">
                    {date.getDate()}/{date.getMonth()}/
                    {date.getFullYear() - 2000}
                </span>
                <span className="hour">
                    {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
                </span>
            </div>
            <div className="messageContent">
                <div className="details">
                    <span className="username">{message.creator.username}</span>
                </div>
                <p>{message.content}</p>
            </div>
        </div>
    );
}
