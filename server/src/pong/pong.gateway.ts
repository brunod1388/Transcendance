import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { PongService } from "./pong.service";
import { InvitationRequestDTO } from "../invitations/dtos/InvitationRequest.dto";
import { InvitationResponseDTO } from "../invitations/dtos/InvitationResponse.dto";
import { OnModuleInit } from "@nestjs/common";

import { BroadcastDTO } from "../general/dto/Broadcast.dto";
import { GameEndDTO } from "../general/dto/GameEnd.dto";

@WebSocketGateway({ cors: { origin: ["http://localhost:9000"] } })
export class PongGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;
    constructor(private readonly pongService: PongService) {}

    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log(socket.id);
        });
    }

    @SubscribeMessage("disconnection")
    handleDisconnection(client: Socket) {
        this.pongService.disconnection(client.id);
    }

    @SubscribeMessage("join")
    handleJoinRoom(client: Socket, room: string) {
        console.log(`user: ${client.id} joined the room ${room}`);
        client.join(room);
    }

    @SubscribeMessage("leave")
    handleLeaveRoom(client: Socket, room: string) {
        console.log(`user: ${client.id} leave the room ${room}`);
        client.leave(room);
    }

    @SubscribeMessage("game-request")
    handleNewGame(client: Socket, invitation: InvitationRequestDTO) {
        console.log(`${invitation.fromUser}`);
        this.pongService.newGame(this.server, invitation);
    }

    @SubscribeMessage("game-response")
    handleGameResponse(client: Socket, response: InvitationResponseDTO) {
        this.server.to(response.fromUser).emit("game-response", response);
        console.log("in response");
        if (response.statut > 0) {
            console.log(
                `user: ${client.id} joined the room ${response.requestId}`
            );
            client.join(response.requestId);
        }
    }

    @SubscribeMessage("game-join")
    handleJoinGame(client: Socket, room: string) {
        const gameRoom = this.server.of("/").adapter.rooms.get(room);
        if (gameRoom?.size === 2) {
            const array = [...gameRoom];
            this.server
                .in(room)
                .emit("game-info", { player1: array[0], player2: array[1] });
        }
    }

    @SubscribeMessage("game-broadcast")
    handleBroadcastGame(client: Socket, broadcast: BroadcastDTO) {
        client.broadcast
            .to(broadcast.room)
            .emit(broadcast.event, broadcast.data);
    }

    @SubscribeMessage("game-end")
    handleGameEnd(client: Socket, gameEndDTO: GameEndDTO) {
        // TO DO write result game in DB;
        console.log(`endGame: ${gameEndDTO}`);
    }
}
