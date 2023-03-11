import { Injectable, Inject } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { ClientsService } from "src/clients/clients.service";
import { InvitationDto } from "./dto/invitation.dto";

@Injectable()
export class GeneralService {
	@Inject(ClientsService)
	private readonly clientsService: ClientsService;

    connection(socket: Socket) {
        // const username = socket.handshake.query.username as string;
        // const userId = socket.handshake.query.username as number;
        // this.clientsService.saveClient(userId, socket.id, username);
		console.log('connection');
    }

    disconnection(socket: Socket, reason: any) {
        // this.clientsService.removeClient(socket.id);
		console.log('disconnection');
    }

    joinRoom(client: Socket, room: string) {
        client.join(room);
    }

    leaveRoom(client: Socket, room: string) {
        client.leave(room);
    }

    sendInvitation(server: Server, client: Socket, invitation: InvitationDto) {
        const socketId = this.clientsService.findByUsername(invitation.to).socketId;
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
}
