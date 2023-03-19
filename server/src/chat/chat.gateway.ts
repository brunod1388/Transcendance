import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dtos/UserValidation.dto";
import { ChannelDto, CreateChannelDto } from "./dtos/Channel.dto";
import { ChannelService } from "./channel/channel.service";
import { User } from "src/users/entities/User.entity";
import { ChannelUserService } from "./channelUser/channelUsers.service";
import { Message, rightType } from "./entities";
import { FriendService } from "src/users/friend/friend.service";
import { ChannelUserDTO } from "./dtos/ChannelUsers.dto";
import { FriendDTO } from "src/users/dtos/Friend.dto";
import { UserDTO } from "src/users/dtos/User.dto";
import {
    CreateMessageDto,
    GetMessagesDto,
    UpdateMessageDto,
} from "./dtos/Message.dto";
import { MessageService } from "./message/message.service";
import { Channel } from "./entities";
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
        private friendService: FriendService,
        private messageService: MessageService
    ) {}

    @WebSocketServer()
    server;

    connectedUser = new Map<number, Socket>();

    @SubscribeMessage("joinRoom")
    async joinRoom(
        @MessageBody('userid') userId: number,
        @MessageBody('channelid') channelid: number,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const messages = await this.messageService.getNLastMessage({
            id: channelid,
            nb: 10,
        });
        client.emit("NLastMessage", messages);
        client.join("room-" + channelid);
        return  "room-" + channelid + " joined";
    }

    @SubscribeMessage("leaveRoom")
    leaveRoom(
        @MessageBody('channelid') channelid: number,
        @ConnectedSocket() client: Socket,
    ) {
        client.leave("room-" + channelid);
        return "room-" + channelid + " left";
    }

    @SubscribeMessage("newChannel")
    async createChannel(
        @MessageBody('newChannel') channel: CreateChannelDto,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        try {
            const newChannel = await this.channelService.createChannel(channel);
            await this.channelUserService.createChannelUser({
                channelId: newChannel.id,
                userId: newChannel.owner.id,
                rights: rightType.ADMIN,
                isPending: false,
            });
            const channels = await this.channelService.getChannels(newChannel.owner.id, false);
            client.emit("Channels", channels);
        } catch (error) {
            return `Channel Name already in use`
        }
        return `OK`;
    }

    @SubscribeMessage("getChannels")
    async getChannels(
        @MessageBody('userid') userid: number,
        @MessageBody('isPending') isPending: boolean
    ) {
        return (await this.channelService.getChannels(userid, isPending));
    }

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(@MessageBody("channelId") channelId: number): Promise<UserDTO[]> {
        const users = (await this.channelUserService
            .getChannelUsers(channelId, false))
            .map((channelUser) => ({
                ...channelUser.user, 
                rights: channelUser.rights,
                channelUserId: channelUser.id
            }));
        return users;
    }

    @SubscribeMessage("createMessage")
    async createMessage(
        @MessageBody() messageDTO: CreateMessageDto,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const user = await this.userService.findUserId(messageDTO.userId);
        const channel = await this.channelService.findChannelById(messageDTO.channelId);
        const newMessage = await this.messageService.createMessage(
            user,
            channel,
            messageDTO.content
            );
            if (newMessage === undefined) return "could not write message";
            const room = "room-" + channel.id;
        const message = {
            id: newMessage.id,
            creator: {
                id: newMessage.creator.id,
                username: newMessage.creator.username,
                avatar: newMessage.creator.avatar
            },
            content: newMessage.content,
            createdAt: newMessage.createdAt,
            modifiedAt: newMessage.modifiedAt,
        }
        this.server.to(room).emit("messageListener", message);
        return "message created";
    }

    @SubscribeMessage("inviteChannelUser")
    async inviteContact(
        @MessageBody('username') username: string,
        @MessageBody('channelId') channelId: number
    ): Promise<string> {
        const user = await this.userService.findUser(username);
        if (user === null) return "error: User " + username + " not Found";
        return (await this.channelUserService.createChannelUser({
            userId: user.id,
            channelId: channelId,
            rights: rightType.NORMAL,
            isPending: true,
        }))
    }

    @SubscribeMessage("inviteFriend")
    async inviteFriend(
        @MessageBody('userid') userId: number,
        @MessageBody('friendname') friendName: string
    ): Promise<string> {
        const friend = await this.userService.findUser(friendName);
        if (friend === null) return "error: User" + friendName + " not Found";
        if (friend.id === userId) return "error: can't invite yourself";
        return (await this.friendService.createFriend({
            userId: userId,
            friendId: friend.id,
        }));
    }

    @SubscribeMessage("updateFriend")
    async updateFriend(
        @MessageBody("id") friendId: number,
        @MessageBody("accept") accept: boolean
    ): Promise<string> {
        if (accept)
        {
            const res = await this.friendService.updateFriend({
                id: Number(friendId),
                isPending: false,
            });
            if (res === undefined) return "Something went wrong";
            return res;
        }
        const res = await this.friendService.deleteFriend(friendId);
        return res;
    }

    @SubscribeMessage("updateChannelUser")
    async updateChannelUser(
        @MessageBody("id") channelUserId: number,
        @MessageBody("accept") accept: boolean
    ): Promise<string | ChannelUserDTO> {
        if (accept)
        {
            const res = this.channelUserService.updateChannelUser({
                id: channelUserId,
                isPending: false,
            });
            if (res === undefined) return "Something went wrong";
            return res;
        }
        const res = await this.channelUserService.deleteChannelUser(channelUserId)
        return res;
    }

    @SubscribeMessage("deleteChannelUser")
    async deleteChannelUser(@MessageBody('id') id: number): Promise<string> {
        return (await this.channelUserService.deleteChannelUser(Number(id)));
    }

    @SubscribeMessage("deleteFriend")
    async deleteFriend(@MessageBody('id') friendId: number): Promise<string> {
        return (await this.friendService.deleteFriend(friendId));
    }

    @SubscribeMessage("getPendings")
    async getPendings(@MessageBody("userId") userId: number): Promise<any[]> {
        const friends = await this.friendService.getFriendsPending(userId);
        const channels = await this.channelUserService.getChannelUsersByUserId(
            userId,
            true
        );
        const invitations: InvitationType[] = friends.map((friend: any) => ({
            id: friend.id,
            type: "Friend",
            name: friend.user.username,
            image: friend.user.avatar ? friend.user.avatar : "",
        }));
        const channelInvitations: InvitationType[] = channels.map(
            (channelUser: any) => ({
                id: channelUser.id,
                type: "Channel",
                name: channelUser.channel.name,
                image: channelUser.channel.image
                    ? channelUser.channel.image
                    : "",
            })
        );
        channelInvitations.forEach((channel) => {
            invitations.push(channel);
        });
        return invitations;
    }

    @SubscribeMessage("getFriends")
    async getFriendsPending(@MessageBody() userId: number): Promise<UserDTO[]> {
        const friends = await this.friendService.getFriends(userId);
        return friends;
    }





    @SubscribeMessage("updateMessage")
    async updateMessage(
        @MessageBody() messageDTO: UpdateMessageDto
    ): Promise<string> {
        const message = this.messageService.updateMessage(messageDTO);
        if (message === undefined) return "could not update message";
        return "message updated";
    }

    @SubscribeMessage("getNLastMessages")
    async getMessages(
        @MessageBody() details: GetMessagesDto
    ): Promise<Message[]> {
        const messages = await this.messageService.getNLastMessage(details);
        return messages;
    }

    @SubscribeMessage("connection")
    async handleConnection(@ConnectedSocket() client: Socket) {
        console.log("Connection of    ", client.id);
    }

    @SubscribeMessage("disconnect")
    async handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log("Disconnection of ", client.id)
    }
}
