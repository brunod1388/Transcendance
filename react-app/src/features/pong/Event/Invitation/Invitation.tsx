import { AcceptDeclinePopUp } from "../../AcceptDecline";
import { Event } from "../Event";
import { socket } from "../../../../App";
import { SetStateType as SetType } from "../../../../@types/SetStateType";
import {
    InvitationOpponent as Invitation,
    InvitationResponse as Response,
} from "./Invitation.interface";

// event name used by the server and the client
const EVENT: string = "game-invitation";

// The user receive an invitation to play PONG
function pongInvitation(events: Event[], setEvents: SetType<Event[]>) {
    socket.on(EVENT, (invitation: Invitation) => {
        handleInvitation(invitation, events, setEvents);
    });
}

// When the user receive the invitation, it is added in the eventlist.
function handleInvitation(
    invitation: Invitation,
    events: Event[],
    setEvents: SetType<Event[]>
) {
    let username: string = invitation.from;
    let requestId: string = invitation.requestId;

    setEvents([
        ...events,
        new Event(
            <PongInvitationPopUp username={username} requestId={requestId} />
        ),
    ]);
}

function acceptInvitation(response: Response) {
    response.statut = 1;
    socket.emit(response.requestId, response);
    socket.emit("join", response.requestId);
    console.log(
        `accept invitation response sent\nrequestId: ${response.requestId}`
    );
}

function refuseInvitation(response: Response) {
    response.statut = -1;
    socket.emit(response.requestId, response);
    console.log(
        `refuse invitation response sent\nrequestId: ${response.requestId}`
    );
}

interface Props {
    username: string;
    requestId: string;
}

// This is the component used to interact with the invitation
function PongInvitationPopUp(props: Props) {
    let response: Response = { requestId: props.requestId, statut: 0 };
    return (
        <AcceptDeclinePopUp
            data={response}
            accepted={(response: Response) => acceptInvitation(response)}
            declined={(response: Response) => refuseInvitation(response)}
        >
            <p>{props.username} has invited you!</p>
        </AcceptDeclinePopUp>
    );
}

export { pongInvitation, PongInvitationPopUp };
