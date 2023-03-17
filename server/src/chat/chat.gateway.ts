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

    @SubscribeMessage("joinRoom")
    async joinRoom(
        @MessageBody('userid') userId: number,
        @MessageBody('channelid') channelid: number,
        @ConnectedSocket() client: Socket,
    ): Promise<string> {

        const users = (await this.channelUserService
            .getChannelUsers(channelid, false))
            .map((channelUser) => ({...channelUser.user, rights: channelUser.rights}));
        client.emit("ChannelUsers", users);
        const messages = await this.messageService.getNLastMessage({
                id: channelid,
                nb: 10,
            });
        console.log(messages)
        client.emit("NLastMessage", messages);
        client.join("room-" + channelid);
        return  "room-" + channelid + " joined";
        // return "test"
    }

    @SubscribeMessage("leaveRoom")
    leaveRoom(client: Socket, room: string) {
        client.leave(room);
        return "left " + room;
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
        @MessageBody('isPending') isPending: boolean,
        @ConnectedSocket() client: Socket
    ) {
        const channels = await this.channelService.getChannels(userid, isPending);
        client.emit("Channels", channels);
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
                id: newMessage.id,
                username: newMessage.creator.username,
                avatar: newMessage.creator.avatar
            },
            content: newMessage.content,
            createdAt: newMessage.createdAt,
            modifiedAt: newMessage.modifiedAt,
        }
        this.server.to(room).emit("messageListener", message);
        // client.emit("messageListener", message);
        return "message created";
    }










    @SubscribeMessage("getPendings")
    async getPendings(@MessageBody() userId): Promise<any[]> {
        const friends = await this.friendService.getFriendsPending(userId);
        const channels = await this.channelUserService.getChannelUsers(
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
        const [userId, friendName] = data;
        const friend = await this.userService.findUser(friendName);
        if (friend === undefined) return "User Not Found";
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
        const res = this.friendService.updateFriend({
            id: friendId,
            isPending: isPending,
        });
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
    async updateChannelUser(
        @MessageBody() data: any
    ): Promise<string | ChannelUserDTO> {
        const [channelId, isPending] = data;
        const res = this.channelUserService.updateChannelUser({
            id: channelId,
            isPending: false,
        });
        if (res === undefined) return "Something went wrong";
        return res;
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

}
