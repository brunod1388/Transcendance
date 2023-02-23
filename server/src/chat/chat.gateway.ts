import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dtos/UserValidation.dto";
import { CreateChannelDto } from "./dtos/Channel.dto";
import { ChannelService } from "./channel/channel.service";

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class ChatGateway {
    constructor(
        private userService: UsersService,
        private channelService: ChannelService
    ) {}

    @WebSocketServer()
    server;

    @SubscribeMessage("newUser")
    async createUserTmp(@MessageBody() data: CreateUserDto): Promise<string> {
        try {
            await this.userService.createUser(data);
        } catch (error) {
            console.log(error.message);
            return error;
        }
        return `user ${data.username} created`;
    }

    @SubscribeMessage("send")
    handleMessage(@MessageBody() message: string): string {
        console.log(message);
        this.server.emit("message", message);
        return "server received message";
    }

    @SubscribeMessage("newChannel")
    async createChannel(
        @MessageBody() data: CreateChannelDto
    ): Promise<string> {
        try {
            await this.channelService.createChannel(data);
        } catch (error) {
            console.log(error.message);
            return error;
        }
        return `OK`;
    }
}
