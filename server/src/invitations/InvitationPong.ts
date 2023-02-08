import { Server } from "socket.io";
// import { Invitation } from "./Invitation";
// import { ResponseDTO } from "./dtos/Response.dto";
// import { InvitationDTO } from "./dtos/Invitation.dto";
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
            .emit(
                "game-invitation",
                opponent,
                (response: InvitationResponseDTO) => this.receive(response)
            );
        console.log(`response sent to ${this.invitation.toUser}`);
    }

    receive(response: InvitationResponseDTO) {
        this.accepted = response.statut;
        console.log(`answer from opponent received: ${response.statut}`);
        this.server.to(this.invitation.toUser).emit("game-response", response);
        console.log("response sent to the sender of the o");
    }

    isAccepted(): boolean {
        return this.accepted > 0;
    }
}
