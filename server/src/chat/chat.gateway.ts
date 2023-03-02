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
import { User } from "src/users/entities/User.entity";

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
            const user = await this.userService.findUserId(data.ownerId);
            const newChannel = await this.channelService.createChannel(data);
        } catch (error) {
            console.log(error.message);
            return error;
        }
        return `OK`;
    }

    // TEST PURPOSE BELOW

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

    @SubscribeMessage("findUserByMail")
    async findUserByMail(
        @MessageBody() data: any
    ): Promise<{ found: boolean; user: User }> {
        const user = await this.userService.findUserByMail(data.email);
        if (user) console.log("vetrou!");
        else console.log("pas vetrou");
        return user
            ? { found: true, user: user }
            : { found: false, user: user };
    }
}
