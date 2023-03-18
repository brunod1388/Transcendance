import { useState, KeyboardEvent } from "react";
import { AddUserIcon } from "../../../assets/images";
import { useAuth, useChat } from "../../../context";
import { useSocket } from "../../../hooks";
import "../styles/invite.scss";

type Props = {
    placeholder: string;
    type: string;
};

export default function AddContact(props: Props) {
    const [message, setMessage] = useState("");
    const [inviteName, setInviteName] = useState("");
    const { userAuth } = useAuth();
    const { channel } = useChat();
    const [socket] = useSocket();

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") inviteContact();
    }

    function inviteContact() {
        if (props.type === "friend") {
            socket.emit("inviteFriend", userAuth.id, inviteName, (res: any) => {
                console.log(res);
            });
        } else {
            socket.emit(
                "inviteChannelUser",
                {
                    username: inviteName,
                    channelId: channel.id,
                },
                (res: any) => {
                    console.log(res);
                    setMessage(res);
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
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
            {message !== "" && (
                <div className="message">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}
