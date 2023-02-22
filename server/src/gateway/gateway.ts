import { OnModuleInit, Res } from "@nestjs/common";
import { Response } from "express";
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "../users/dtos/UserValidation.dto";

// By default, the websocket gateway will listen on the same port as the server (3000)
// The port can be changed if desired by passing a custom port e.g. @WebSocketGateway(3001)
// If CORS is required, it can be added inside the parethesises here:
//@WebSocketGateway({
//    cors: {
//        origin:
//    }
//})
@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class WSGateway
    implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private authService: AuthService) {}

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log("Socket ID: ", socket.id, " is initialized");
        });
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log("Client with id:", client.id, "has connected");
    }

    handleDisconnect(client: Socket) {
        console.log("Client with id:", client.id, "has disconnected");
    }

    @SubscribeMessage("msgToServer")
    handleMessage(
        @MessageBody() payload: string,
        client: Socket
    ): WsResponse<string> {
        console.log(payload);
        //    This event is emitted only to the client who sent the message to the server (identified by socket)
        return { event: "msgToClient", data: payload };
    }

    @SubscribeMessage("newUser")
    async handleNewUser(
        @MessageBody() payload: CreateUserDto
    ): Promise<string> {
        console.log(payload);
        const token = await this.authService.signup(payload);
        console.log("jwt_token: ", token["access_token"]);
        //    response.cookie("jwt_token", token["access_token"]);
        //        res.header('Authorization', `Bearer ${token["access_token"]}`);
        return "user created";
    }
}
