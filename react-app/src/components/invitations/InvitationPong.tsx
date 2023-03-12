import { NONE, ACCEPTED, DECLINED, InvitationDTO } from "../../@types";
import { useNavigate } from "react-router-dom";
import { useNotificationsDispatch, useSocket } from "../../hooks";
import { useTimeout } from "../../hooks";
import { removeNotification } from "../../utils";
import { joinGame, sendResponse } from "../../utils";
import { useFeature } from "../../context";
import { useSearchParams } from "react-router-dom";
import { Feature } from "../../context";

interface Props {
    invitation: InvitationDTO;
    id: string;
    onDisplay: (result: boolean) => void;
}

// This notification contains two button to respond to the invitation,
export function InvitationPong({ id, invitation, onDisplay }: Props) {
    const [socket] = useSocket();
    const {setFeature} = useFeature();
    const dispatch = useNotificationsDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const activatePong = (roomName: string) => {
		setFeature(Feature.Pong);
		setSearchParams({["room"]: roomName});
	}

    useTimeout(() => {
        onClose();
    }, 3000);

    const onClose = (statut: number = NONE) => {
		sendResponse(
            statut,
            "pong",
            invitation.from,
            invitation.room
        );
        if (statut === ACCEPTED) {
            console.log(invitation.room);
            joinGame(socket, invitation.room, activatePong);
        }
        removeNotification(id, dispatch);
        onDisplay(false);
    };

    return (
        <div>
            <button onClick={() => onClose(ACCEPTED)}>accept</button>
            <button onClick={() => onClose(DECLINED)}>decline</button>
        </div>
    );
}