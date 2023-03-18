import { useCallback, useEffect, useState } from "react";
import {
    NoChannelIcon,
    NoUserIcon,
    Accept,
    Decline,
} from "../../../assets/images";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";

interface InvitationType {
    id: number;
    type: "Friend" | "Channel";
    name: string;
    image: string;
}

export default function Invitations() {
    const { userAuth } = useAuth();
    const [socket] = useSocket();
    const [invitations, setInvitations] = useState<InvitationType[]>([]);

    function updateInvitations() {
        console.log("GetPendings");
        socket.emit(
            "getPendings",
            { userId: userAuth.id },
            (res: InvitationType[]) => {
                console.log(res);
                setInvitations(
                    res.map((i: InvitationType) => {
                        if (i.image === "")
                            i.image =
                                i.type === "Friend"
                                    ? NoUserIcon
                                    : NoChannelIcon;
                        return i;
                    })
                );
            }
        );
    }

    function handleInvitation(type: string, accept: boolean, id: number) {
        const handleMessage =
            type === "Friend" ? "updateFriend" : "updateChannelUser";
        socket.emit(handleMessage, { id: id, accept: accept }, (res: any) => {
            console.log(res);
        });
        // updateInvitations();
        setInvitations((state) =>
            state.filter((item) => !(item.type === type && item.id === id))
        );
    }

    useEffect(() => {
        updateInvitations();
    }, []);

    return (
        <div className="invitations">
            {invitations.length === 0 && (
                <span className="title noInvitation">
                    No pending invitations
                </span>
            )}
            {invitations.length > 0 && (
                <span className="title">Invitation</span>
            )}
            {invitations.length > 0 &&
                invitations.map((invite) => (
                    <div className="invitation" key={invite.name}>
                        <img src={invite.image} alt="" className="icon" />
                        <span className="name">
                            {invite.type} invitation : {invite.name}
                        </span>
                        <img
                            className="accept animate"
                            src={Accept}
                            alt=""
                            onClick={() =>
                                handleInvitation(invite.type, true, invite.id)
                            }
                        />
                        <img
                            className="decline animate"
                            src={Decline}
                            alt=""
                            onClick={() =>
                                handleInvitation(invite.type, false, invite.id)
                            }
                        />
                    </div>
                ))}
        </div>
    );
}
