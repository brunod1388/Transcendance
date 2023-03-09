import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dtos/UserValidation.dto";
import { ChannelDto, CreateChannelDto } from "./dtos/Channel.dto";
import { ChannelService } from "./channel/channel.service";
import { User } from "src/users/entities/User.entity";
import { ChannelUserService } from "./channelUser/channelUsers.service";
import { rightType } from "./entities";

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class ChatGateway {
    constructor(
        private userService: UsersService,
        private channelService: ChannelService,
        private channelUserService: ChannelUserService
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
    async createChannel(@MessageBody() data: CreateChannelDto
    ): Promise<string> {
        try {
            const newChannel = await this.channelService.createChannel(data);
            await this.channelUserService.createChannelUser({
                channelId: newChannel.id,
                userId: newChannel.owner.id,
                rights: rightType.ADMIN,
                isPending: false,
            });
        } catch (error) {
            return error;
        }
        return `OK`;
    }

    @SubscribeMessage("getChannels")
    async getChannels(socket: Socket, userId: number): Promise<ChannelDto[]> {
        const channels = await this.channelService.getUserChannels(userId);
        return channels;
    }

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(@MessageBody() channelId: number): Promise<User[]> {
        const channels = await this.channelService.getChannelUsers(channelId);
        console.log(channels);
        // return this.server.emit("channels", channels);
        return channels;
    }

    // @SubscribeMessage("joinRoom")
    // async joinRoom(socket: Socket, room: string): Promise<string> {
    //     const { userId } = data;

    //     return await this.channelService.getChannelsForUserId(userId);
    // }

    // @SubscribeMessage("findUser")
    // async findUserByName(
    //     @MessageBody() name: string
    // ): Promise<{ found: boolean; user: User }> {
    //     const user = await this.userService.findUser(name);
    //     if (user) console.log("vetrou!");
    //     else console.log("pas vetrou");
    //     return user
    //         ? { found: true, user: user }
    //         : { found: false, user: user };
    // }
}
