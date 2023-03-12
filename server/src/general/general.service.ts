import { Injectable, Inject } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { ClientsService } from "src/clients/clients.service";
import { InvitationDto } from "./dto/invitation.dto";
import { BroadcastDTO } from "src/general/dto/Broadcast.dto";

@Injectable()
export class GeneralService {
    @Inject(ClientsService)
    private readonly clientsService: ClientsService;

    connection(socket: Socket) {
        console.log("connection");
    }

    disconnection(socket: Socket, reason: any) {
        this.clientsService.removeClient(socket.id);
        console.log("disconnection");
    }

    joinRoom(client: Socket, room: string) {
        client.join(room);
    }

    leaveRoom(client: Socket, room: string) {
        client.leave(room);
    }

    sendInvitation(server: Server, client: Socket, invitation: InvitationDto) {
        const socketId = this.clientsService.findByUsername(
            invitation.to
        ).socketId;
        server.to(socketId).emit("invitation", invitation);
    }

    broadcast(server: Server, client: Socket, broadcast) {
        // if (broadcast.event === "game-player-left") {
        //     client.broadcast
        //         .to(broadcast.room)
        //         .emit(
        //             broadcast.event,
        //             client.handshake.query.username as string
        //         );
        // } else {
        //     client.broadcast
        //         .to(broadcast.room)
        //         .emit(broadcast.event, broadcast.data);
        // }
    }

    gameBroadcast(client: Socket, broadcast: BroadcastDTO) {
        if (broadcast.event === "game-player-left") {
            client.broadcast.to(broadcast.room).emit(broadcast.event);
        } else {
            client.broadcast
                .to(broadcast.room)
                .emit(broadcast.event, broadcast.data);
        }
    }

    gameJoin(server: Server, room: string) {
        let i = 0;
        let player1 = "";
        let player2 = "";
        server
            .in(room)
            .fetchSockets()
            .then((sockets: any) => {
                if (sockets.length === 2) {
                    i = sockets.length;
                    console.log(this.clientsService.findByUsername(sockets));
                    player1 = sockets[0].id;
                    player2 = sockets[1].id;
                    // console.log(player1, player2);
                    server.to(player1).emit("game-info", {
                        player1: player1,
                        player2: player2,
                    });
                    server.to(player2).emit("game-info", {
                        player1: player1,
                        player2: player2,
                    });
                }
            });
    }

    gameEnd() {
        // TO DO write result game in DB;
        console.log(`endGame`);
    }
}
