import {
    useEffect,
    useState,
    MouseEvent,
    FormEvent,
    KeyboardEvent,
} from "react";
import { AddUserIcon } from "../../../assets/images";
import "../styles/invite.scss";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";

type inviteType = "friend" | "channelUser";
type Props = {
    placeholder: string;
    type: string;
};

export default function AddContact(props: Props) {
    const [inviteName, setInviteName] = useState("");
    const { userAuth } = useAuth();
    const { channel } = useChat();
    const [socket] = useSocket();

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") inviteContact();
    }

    function inviteContact() {
        if (props.type === "friend") {
            socket.emit("inviteFriend", inviteName, userAuth.id, (res: any) => {
                console.log(res);
            });
        } else {
            socket.emit(
                "inviteChannelUser",
                inviteName,
                channel.currentChannelId,
                (res: any) => {
                    console.log(res);
                }
            );
        }
        console.log(inviteName);
        setInviteName("");
    }

    return (
        <div className="invite">
            <input
                name="invite"
                type="text"
                placeholder={props.placeholder}
                value={inviteName}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInviteName(e.target.value)}
            />
            <button className="button-purple" onClick={() => inviteContact()}>
                <img src={AddUserIcon} alt="" />
            </button>
        </div>
    );
}
