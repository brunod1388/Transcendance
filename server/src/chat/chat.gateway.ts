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
import { ChannelUserDTO } from "./dtos/ChannelUsers.dto";
import { FriendDTO } from "src/users/dtos/Friend.dto";
import { UserDTO } from "src/users/dtos/User.dto";

interface InvitationType {
    id: number;
    type: "Friend" | "Channel";
    name: string;
    image: string;
}


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
    async getChannels(@MessageBody() data: any): Promise<ChannelUserDTO[]> {
        const [userId, isPending] = data;
        return (
            await this.channelUserService.getChannelUsers(userId, isPending)
        ).map((channelUser) => channelUser.channel);
    }

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(@MessageBody() channelId: number): Promise<User[]> {
        const channels = await this.channelService.getChannelUsers(channelId);
        return channels;
    }

    @SubscribeMessage("getPrivateUsers")
    async getPrivateUsers(@MessageBody() userId: number): Promise<User[]> {
        const channels = await this.channelService.getChannelUsers(userId);
        return channels;
    }

    @SubscribeMessage("getPendings")
    async getPendings(@MessageBody() userId): Promise<any[]> {
        const friends = await this.friendService.getFriendsPending(userId);
        const channels = await this.channelUserService.getChannelUsers(userId, true);

        const invitations: InvitationType[] = friends.map((friend: any) => ({
            id: friend.id,
            type: "Friend",
            name: friend.user.username,
            image: friend.user.avatar ? friend.user.avatar : ""
        }));

        const channelInvitations: InvitationType[] = channels.map((channelUser: any) => ({
            id: channelUser.id,
            type: "Channel",
            name: channelUser.channel.name,
            image: channelUser.channel.image ? channelUser.channel.image : ""
        }));
        channelInvitations.forEach(channel => { invitations.push(channel)});
        console.log(invitations);
        return invitations;
    }

    @SubscribeMessage("getFriends")
    async getFriendsPending(@MessageBody() userId: number): Promise<UserDTO[]> {
        const friends = await this.friendService.getFriends(userId);
        console.log(friends);
        return friends;
    }

    @SubscribeMessage("inviteFriend")
    async inviteFriend(@MessageBody() data: any): Promise<string> {
        const [userId, friend] = data;
        const newFriend = await this.userService.findUser(friend);
        if (newFriend === undefined) return "User Not Found";
        const res = await this.friendService.createFriend({
            userId: userId,
            friendId: friend.id,
        });
        if (res === undefined) return "Something went wrong";
        return "Invitation sent";
    }

    @SubscribeMessage("updateFriend")
    async updateFriend(@MessageBody() data: any): Promise<string> {
        const [friendId, isPending] = data;
        const res = this.friendService.updateFriend({id: friendId, isPending: isPending});
        if (res === undefined) return "Something went wrong";
        return "Friend updated";
    }

    @SubscribeMessage("inviteChannelUser")
    async inviteContact(@MessageBody() data: any): Promise<string> {
        const [username, channelId] = data;
        const user = await this.userService.findUser(username);
        if (user === undefined) return "User Not Found";
        this.channelUserService.createChannelUser({
            userId: user.id,
            channelId: channelId,
            rights: rightType.NORMAL,
            isPending: true,
        });
        return "Invitation Sent";
    }

    @SubscribeMessage("updateChannelUser")
    async updateChannelUser(@MessageBody() data: any): Promise<string | ChannelUserDTO> {
        const [channelId, isPending] = data;
        const res = this.channelUserService.updateChannelUser({id: channelId, isPending: false});
        if (res === undefined) return "Something went wrong";
        return res;
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
