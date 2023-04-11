import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { ClientsService } from "src/clients/clients.service";
import { InvitationDto } from "./dto/invitation.dto";
import { BroadcastDTO } from "src/general/dto/Broadcast.dto";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/User.entity";
import { CreateMatchDto } from "src/match/dtos/Match.dto";

@Injectable()
export class GeneralService {
    @Inject(ClientsService)
    private readonly clientsService: ClientsService;
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService;

    // map used to store the user id (key) and the corresponding socket id (value)
    static usersOnline = new Map<number, Socket>();

    async obtainOpponentSocket(client: Socket, server: Server, room: string) {
        const socketsInRoom = server.sockets.adapter.rooms.get(room);
        const all_sockets = await server.fetchSockets();

        for (const socketId of socketsInRoom) {
            if (socketId !== client.id) {
                const opponentSocket = all_sockets.find(
                    (s) => s.id === socketId
                );
                if (opponentSocket !== undefined) {
                    return opponentSocket;
                }
            }
        }
        return undefined;
    }

    async obtainOpponentInfo(client: Socket, server: Server, room: string) {
        const opponentSocket = await this.obtainOpponentSocket(
            client,
            server,
            room
        );
        if (opponentSocket !== undefined) {
            const me: User = await this.userService.findUserId(
                client.data.user.id
            );
            const opponent: User = await this.userService.findUserId(
                opponentSocket.data.user.id
            );
            opponentSocket.emit("set-opponent-info", {
                id: me.id,
                username: me.username,
            });
            client.emit("set-opponent-info", {
                id: opponent.id,
                username: opponent.username,
            });
        }
    }

    connection(socket: Socket) {
        // console.log("connection");

        // check to avoid same user id connecting with multiple sockets
        // has method returns true if the key is present otherwise returns false
        // if (GeneralService.usersOnline.has(socket.data.user.id)) {
        //     console.log("User already has active socket connection");
        //     socket.disconnect();
        //     return;
        // }
        GeneralService.usersOnline.set(socket.data.user.id, socket);

        const data: number[] = [];

        GeneralService.usersOnline.forEach((value: Socket, key: number) => {
            //console.log("Online users [on connect]: ", key, value.id);
            data.push(key);
        });

        socket.broadcast.emit("users_online", data);
    }

    disconnection(socket: Socket, reason: any) {
        // this.clientsService.removeClient(opponentSocket.id);
        // console.log("disconnection");

        // console.log(
        //     "User with id: ",
        //     socket.data.user.id,
        //     "will be disconnected"
        // );
        GeneralService.usersOnline.delete(socket.data.user.id);

        const data: number[] = [];

        GeneralService.usersOnline.forEach((value: Socket, key: number) => {
            // console.log("Online users [on disconnect]: ", key, value.id);
            data.push(key);
        });

        socket.broadcast.emit("users_online", data);

        console.log(
            "Number of users online following disconnect: ",
            GeneralService.usersOnline.size
        );
        socket.disconnect();
    }

    getUsersOnline() {
        const ret = GeneralService.usersOnline;
        return ret;
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
    async createMatch(matchDetail: CreateMatchDto) {
        // const user1 = await this.userService.findUserId(matchDetail.user1id);
        // const user2 = await this.userService.findUserId(matchDetail.user2id);
        console.log(
            matchDetail.score1,
            matchDetail.score2,
            matchDetail.type,
            matchDetail.user1id,
            matchDetail.user2id,
            matchDetail.winner
        );
        // const match = this.matchRepository.create({
        //     user1: user1,
        //     user2: user2,
        //     score1: matchDetail.score1,
        //     score2: matchDetail.score2,
        // 	winner: (matchDetail.winner === user1.id) ? user1 : user2,
        //     type: matchDetail.type,
        // });

        // return this.matchRepository.save(match);
    }
}
