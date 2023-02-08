import { Injectable } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { InvitationPong } from "../invitations/InvitationPong";
import { InvitationRequestDTO } from "../invitations/dtos/InvitationRequest.dto";
import { InvitationResponseDTO } from "../invitations/dtos/InvitationResponse.dto";

@Injectable()
export class PongService {
    connection(clientId: string) {
        console.log(`${clientId} connected`);
    }

    disconnection(clientId: string) {
        console.log(`${clientId} connected`);
    }

    newGame(
        client: Socket,
        server: Server,
        InvitationRequest: InvitationRequestDTO
    ) {
        const invitation = new InvitationPong(server, InvitationRequest);
        invitation.send();
        client.join(invitation.requestId);
    }
}
