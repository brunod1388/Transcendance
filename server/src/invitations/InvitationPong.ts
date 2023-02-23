import { Server } from "socket.io";
import { InvitationResponseDTO } from "./dtos/InvitationResponse.dto";
import { InvitationRequestDTO } from "./dtos/InvitationRequest.dto";
import { InvitationOpponentDTO } from "./dtos/InvitationOpponent.dto";
// import { InvitationResponseDTO } from "./dtos/InvitationResponse.dto";

export class InvitationPong {
    server: Server;
    accepted: number;
    requestId: string;
    invitation: InvitationRequestDTO;

    constructor(theServer: Server, invitation: InvitationRequestDTO) {
        this.server = theServer;
        this.accepted = 0;
        this.invitation = invitation;
        this.requestId = invitation.fromUser + invitation.toUser; // temporary
    }

    send() {
        const opponent: InvitationOpponentDTO = {
            requestId: this.requestId,
            from: this.invitation.fromUser,
        };
        this.server
            .to(this.invitation.toUser)
            .emit("game-invitation", opponent);
        console.log(`response sent to ${this.invitation.toUser}`);
    }
}
