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

interface recordGameDto {
    player1: {
        username: string;
        score: number;
        status: string;
    };
    player2: {
        username: string;
        score: number;
        status: string;
    };
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
@WebSocketGateway({ cors: { origin: ["http://localhost:9000"] } })
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
                    socket.data.user = { id: payload.sub};
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

    @SubscribeMessage("invitation")
    handleInvitation(client: Socket, invitation: InvitationDto) {
        this.server.emit("invitation", invitation);
    }

    @SubscribeMessage("response")
    handleResponse(client: Socket, response: ResponseDto) {
        this.server.emit("response", response);
    }
    @SubscribeMessage("joinPong")
    handleJoinPong(client: Socket, room: string) {
        this.server.to(room).emit("joinPong");
    }

    @SubscribeMessage("player")
    handlePlayer(client: Socket, data: pongDTO) {
        console.log("recieved player");
        client.broadcast.to(data.room).emit("player", data.player);
    }
    @SubscribeMessage("game-player-left")
    handlePlayerLeft(client: Socket, room: string) {
        client.broadcast.to(room).emit("game-player-left");
        client.leave(room);
    }

    @SubscribeMessage("game-score")
    handleScore(client: Socket, score: scoreDto) {
        this.server.to(score.room).emit("game-score", {
            player1: score.score.player1,
            player2: score.score.player2,
        });
    }

    @SubscribeMessage("record-game")
    handleRecordGame(client: Socket, record: recordGameDto) {
        //
    }

    @SubscribeMessage("game-ball")
    handleUpdatedBall(client: Socket, ball: BallDto) {
        client.broadcast.to(ball.room).emit("game-ball", ball.data);
    }

	@SubscribeMessage("obtain-opponent-info")
    async handleOpponentInfo(client: Socket, room: string) {
      this.generalService.obtainOpponentInfo(client, this.server, room);

    }
}
