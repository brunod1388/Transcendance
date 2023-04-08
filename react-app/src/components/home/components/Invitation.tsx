import { useCallback, useEffect, useState } from "react";
import {
    NoChannelIcon,
    NoUserIcon,
    AcceptIcon,
    DeclineIcon,
} from "../../../assets/images";
import { useSocket } from "../../../hooks";
import { useAuth } from "../../../context";
import { ChatInvitationType } from "../../../@types";

type Props = {
    invitations: ChatInvitationType[];
    setInvitations: React.Dispatch<React.SetStateAction<ChatInvitationType[]>>;
    setNotif: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Invitations(props: Props) {
    const { invitations, setInvitations, setNotif } = props;
    const { userAuth } = useAuth();
    const [socket] = useSocket();

    function handleInvitation(type: string, accept: boolean, id: number) {
        const handleMessage =
            type === "Friend" ? "updateFriend" : "updateChannelUser";
        console.log("handleMessage: ", handleMessage);
        socket.emit(handleMessage, { id: id, accept: accept }, (res: any) => {
            console.log(res);
            if (invitations.length === 1) setNotif(false);
            setInvitations((state) =>
                state.filter((item) => !(item.type === type && item.id === id))
            );
        });
    }

    return (
        <div>
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
                            src={AcceptIcon}
                            alt=""
                            onClick={() =>
                                handleInvitation(invite.type, true, invite.id)
                            }
                        />
                        <img
                            className="decline animate"
                            src={DeclineIcon}
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
