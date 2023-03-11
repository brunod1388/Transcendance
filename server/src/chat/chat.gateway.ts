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
import { FriendService } from "src/users/friend/friend.service";

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class ChatGateway {
    constructor(
        private userService: UsersService,
        private channelService: ChannelService,
        private channelUserService: ChannelUserService,
        private friendService: FriendService
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
    async getChannels(@MessageBody() userId: number): Promise<ChannelDto[]> {
        const channels = await this.channelService.getUserChannels(userId);
        return channels;
    }

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(@MessageBody() channelId: number): Promise<User[]> {
        const channels = await this.channelService.getChannelUsers(channelId);
        console.log(channels);
        return channels;
    }

    @SubscribeMessage("getPrivateUsers")
    async getPrivateUsers(@MessageBody() userId: number): Promise<User[]> {
        const channels = await this.channelService.getChannelUsers(userId);
        console.log(channels);
        return channels;
    }

    @SubscribeMessage("inviteFriend")
    async inviteFriend(
        @MessageBody() username: string,
        @MessageBody() userId: number
    ): Promise<string> {
        const friend = await this.userService.findUser(username);
        if (friend === undefined) return "User Not Found";
        this.friendService.createChannelUser({
            userId: userId,
            friendId: friend.id,
        });
        return "Ok";
    }

    @SubscribeMessage("inviteContact")
    async inviteContact(
        @MessageBody() username: string,
        @MessageBody() channelId: number
    ): Promise<string> {
        const user = await this.userService.findUser(username);
        console.log(username);
        if (user === undefined) return "User Not Found";
        this.channelUserService.createChannelUser({
            userId: user.id,
            channelId: channelId,
            rights: rightType.NORMAL,
            isPending: true,
        });
        console.log("test : ", username);
        console.log("test : ", channelId);
        return "ok";
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
