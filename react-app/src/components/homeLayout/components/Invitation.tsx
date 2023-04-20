import { useEffect, useState } from "react";
import { useSocket } from "hooks";
import { useAuth } from "context";
import { ChatInvitationType } from "@customTypes";
import {
    NoChannelIcon,
    NoUserIcon,
    AcceptIcon,
    DeclineIcon,
    BellIcon,
} from "assets/images";
import "../styles/invitations.scss";

export default function Invitations() {
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const [notif, setNotif] = useState(false);
    const [invitations, setInvitations] = useState<ChatInvitationType[]>([]);

    useEffect(() => {
        socket.emit(
            "getPendings",
            { userId: userAuth.id },
            (res: ChatInvitationType[]) => {
                setInvitations(
                    res.map((i: ChatInvitationType) => {
                        if (i.image === "")
                            i.image =
                                i.type === "Friend"
                                    ? NoUserIcon
                                    : NoChannelIcon;
                        return i;
                    })
                );
                if (res.length > 0) setNotif(true);
            }
        );
        socket.on("pendings", (invitation: ChatInvitationType) => {
            console.log("invitation received: ", invitation);
            setNotif(true);
            setInvitations((state) => [...state, invitation]);
        });
        return () => {
            socket.off("pendings");
        };
    }, [socket, setInvitations]);

    function handleInvitation(invite: ChatInvitationType, accept: boolean) {
        const handleMessage =
            invite.type === "Friend" ? "updateFriend" : "updateChannelUser";
        console.log("handleMessage: ", handleMessage);
        socket.emit(
            handleMessage,
            { id: invite.id, accept: accept },
            (res: any) => {
                console.log(res);
                if (invitations.length === 1) setNotif(false);
                setInvitations((state) =>
                    state.filter(
                        (item) =>
                            !(
                                item.type === invite.type &&
                                item.id === invite.id
                            )
                    )
                );
            }
        );
    }

    function toggleMenu() {
        const menu = document.getElementById("invitation-menu");
        if (menu) menu.classList.toggle("active");
    }

    function handleClickOutside(event: MouseEvent) {
        const menu = document.getElementById("invitation-menu");

        if (menu && !menu.contains(event.target as Node))
            menu.classList.remove("active");
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () =>
            document.removeEventListener("click", handleClickOutside, true);
    }, []);

    return (
        <div className="invitations-container">
            <img
                className={"invitations-icon" + (notif ? " notif" : "")}
                src={BellIcon}
                alt="invitation-icon"
                onClick={toggleMenu}
            />
            <div className="invitations-menu" id="invitation-menu">
                <span className="title">Invitations</span>
                {invitations.length === 0 && (
                    <span className="noInvitation">No pending invitations</span>
                )}
                {invitations.length > 0 &&
                    invitations.map((invite) => (
                        <div className="invitation-container" key={invite.name}>
                            <img
                                src={invite.image}
                                alt="invite"
                                className="icon"
                            />
                            <div className="invitation-details">
                                <div className="invitation-line">
                                    <span>{invite.type} invitation :</span>
                                </div>
                                <div className="invitation-line">
                                    <span className="name">{invite.name}</span>
                                    <div className="invitation-choice">
                                        <img
                                            className="accept choice"
                                            src={AcceptIcon}
                                            alt="accept"
                                            onClick={() =>
                                                handleInvitation(invite, true)
                                            }
                                        />
                                        <img
                                            className="decline choice"
                                            src={DeclineIcon}
                                            alt="decline"
                                            onClick={() =>
                                                handleInvitation(invite, false)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
