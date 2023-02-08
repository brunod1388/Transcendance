import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { PongService } from "./pong.service";
import { InvitationRequestDTO } from "../invitations/dtos/InvitationRequest.dto";

@WebSocketGateway({ cors: { origin: ["http://localhost:9000"] } })
export class PongGateway {
    @WebSocketServer()
    server: Server;
    constructor(private readonly pongService: PongService) {}

    @SubscribeMessage("connect")
    handleConnection(client: Socket) {
        this.pongService.connection(client.id);
    }

    @SubscribeMessage("join")
    handleJoinRoom(client: Socket, room: string) {
        client.join(room);
    }

    @SubscribeMessage("disconnect")
    handleDisconnection(client: Socket) {
        this.pongService.disconnection(client.id);
    }

    @SubscribeMessage("game-request")
    handleNewGame(client: Socket, invitation: InvitationRequestDTO) {
        console.log(`${invitation.fromUser}`);
        this.pongService.newGame(client, this.server, invitation);
    }
}
