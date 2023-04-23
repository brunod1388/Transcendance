import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    ConnectedSocket,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
import { GeneralService } from "./general.service";
import { GameEndDTO } from "src/general/dto/GameEnd.dto";
import { InvitationDto } from "./dto/invitation.dto";
import { ResponseDto } from "./dto/response.dto";
import * as jwt from "jsonwebtoken";
import { CreateMatchDto } from "src/match/dtos/Match.dto";

interface pongDTO {
    room: string;
    player: {
        host: false;
        status: string;
        username: null;
        id: number;
    };
}
interface Score {
    player1: number;
    player2: number;
}
interface scoreDto {
    score: Score;
    room: string;
}
interface Ball {
    pos: {
        x: number;
        y: number;
    };
    delta: {
        x: number;
        y: number;
    };
    speed: number;
}
interface BallDto {
    room: string;
    data: Ball;
}

interface ClassicDTO {
    room: string;
    paddle: { x: number; y: number };
}
interface Position {
    x: number;
    y: number;
}

interface PingPongDTO {
    room: string;
    paddle: {
        pos: Position;
        movement: Position;
    };
}

enum GameMode {
    CLASSIC = "classic",
    PINGPONG = "pingpong",
}
interface GameModeDTO {
    room: string;
    mode: GameMode;
}
@WebSocketGateway({
    cors: {
        origin: [process.env.REACT_APP_FRONTEND_URL],
    },
})
export class GeneralGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    constructor(private generalService: GeneralService) {}

    // handle connection and disconnection of sockets
    onModuleInit() {
        this.server.use(async function (socket: Socket, next) {
            if (socket.handshake && socket.handshake.auth.token) {
                //console.log("Handshake: ", socket.handshake.auth.token);
                const token = socket.handshake.auth.token;
                //console.log("Jwt secret: ", process.env.JWT_SECRET);
                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        console.log("Socket connection NOT AUTHORIZED");
                        return next(
                            new Error("Unauthorized socket connection attempt")
                        );
                    }
                    //console.log("JWT payload: ", payload);
                    socket.data.user = { id: payload.sub };
                    //console.log("Socket user data: ", socket.data.user);
                    console.log("Socket connection AUTHORIZED");
                    next();
                });
            } else {
                console.log("Socket connection NOT AUTHORIZED");
                next(new Error("Unauthorized socket connection attempt"));
            }
        });
        this.server.on("connection", (socket: Socket) => {
            this.generalService.connection(this.server, socket);
            socket.on("disconnect", (reason) => {
                this.generalService.disconnection(this.server, socket, reason);
            });
        });
    }

    // client's socket join room
    @SubscribeMessage("join")
    handleJoinRoom(client: Socket, room: string) {
        console.log("join room");
        this.generalService.joinRoom(client, room);
        this.generalService.addGameRoom(client.data.user.id, room);
        this.generalService.addUserInGame(client.data.user.id);
        this.generalService.updateUserStatus(this.server, client);
    }

    // client's socket leave room
    @SubscribeMessage("leave")
    handleLeaveRoom(client: Socket, room: string) {
        console.log("leaveROom");
        this.generalService.leaveRoom(client, room);
        this.generalService.removeGameRoom(room);
        this.generalService.removeUserInGame(client.data.user.id);
        this.generalService.updateUserStatus(this.server, client);
    }

    @SubscribeMessage("game-paddle-classic")
    handleClassicPaddle(client: Socket, data: ClassicDTO) {
        client.broadcast.to(data.room).emit("game-paddle", data.paddle);
    }

    // Event to broadcast different event inside a specific room.
    @SubscribeMessage("game-paddle-pingpong")
    handlePingPongPaddle(client: Socket, data: PingPongDTO) {
        client.broadcast.to(data.room).emit("game-paddle", data.paddle);
    }

    @SubscribeMessage("invitation")
    handleInvitation(client: Socket, invitation: InvitationDto) {
        this.generalService.handleInvitation(this.server, client, invitation);
    }

    @SubscribeMessage("response")
    handleResponse(client: Socket, response: ResponseDto) {
        this.generalService.handleResponse(this.server, client, response);
    }

    @SubscribeMessage("player")
    async handlePlayer(client: Socket, data: pongDTO) {
        const socks = await this.server.in(data.room).fetchSockets();
        socks.forEach((socket) => {
            if (socket.id !== client.id) {
                socket.emit("player", data.player);
            }
        });
    }

    @SubscribeMessage("game-player-left")
    handlePlayerLeft(client: Socket, room: string) {
        this.generalService.leaveRoom(client, room);
        console.log("id", client.data.user.id);
        this.generalService.removeGameRoom(room);
        this.generalService.removeUserInGame(client.data.user.id);
        this.generalService.updateUserStatus(this.server, client);
        this.server.to(room).emit("game-player-left");
    }

    @SubscribeMessage("game-score")
    handleScore(client: Socket, score: scoreDto) {
        this.server.to(score.room).emit("game-score", {
            player1: score.score.player1,
            player2: score.score.player2,
        });
    }

    @SubscribeMessage("game-ball")
    handleUpdatedBall(client: Socket, ball: BallDto) {
        client.broadcast.to(ball.room).emit("game-ball", ball.data);
    }

    @SubscribeMessage("obtain-opponent-info")
    async handleOpponentInfo(client: Socket, room: string) {
        await this.generalService.obtainOpponentInfo(client, this.server, room);
    }

    @SubscribeMessage("game-mode")
    async handleGameMode(client: Socket, data: GameModeDTO) {
        client.broadcast.to(data.room).emit("game-mode", data.mode);
    }
}
