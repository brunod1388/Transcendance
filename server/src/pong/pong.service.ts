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
    test(client: Socket, server: Server, response: InvitationResponseDTO) {
        console.log("received event");
        if (client.id !== response.fromUser) {
            console.log("isOpponent");
            server.to(response.fromUser).emit("game-response", response);
        }
        if (response.statut > 0) {
            console.log("join room");
            client.join(response.requestId);
        }
    }

    newGame(server: Server, InvitationRequest: InvitationRequestDTO) {
        const invitation = new InvitationPong(server, InvitationRequest);
        invitation.send();
    }
}
