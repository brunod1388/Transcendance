import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
import { BroadcastDTO } from "src/general/dto/Broadcast.dto";
import { GeneralService } from "./general.service";
import { GameEndDTO } from "src/general/dto/GameEnd.dto";

@WebSocketGateway({ cors: { origin: ["http://localhost:9000"] } })
export class GeneralGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    constructor(private generalService: GeneralService) {}

    // handle connection and disconnection of sockets
    onModuleInit() {
        this.server.on("connection", (socket: Socket) => {
            this.generalService.connection(socket);
            socket.on("disconnect", (reason) => {
                this.generalService.disconnection(socket, reason);
            });
        });
    }

    // client's socket join room
    @SubscribeMessage("join")
    handleJoinRoom(client: Socket, room: string) {
        this.generalService.joinRoom(client, room);
    }

    // client's socket leave room
    @SubscribeMessage("leave")
    handleLeaveRoom(client: Socket, room: string) {
        this.generalService.leaveRoom(client, room);
    }

    @SubscribeMessage("game-join")
    handleJoinGame(client: Socket, room: string) {
        this.generalService.gameJoin(this.server, room);
    }

    // Event to broadcast different event inside a specific room.
    @SubscribeMessage("game-broadcast")
    handleBroadcastGame(client: Socket, broadcast: BroadcastDTO) {
        this.generalService.gameBroadcast(client, broadcast);
    }

    @SubscribeMessage("game-end")
    handleGameEnd(client: Socket, gameEndDTO: GameEndDTO) {
        this.generalService.gameEnd();
    }
}
