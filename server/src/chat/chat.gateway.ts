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
import { ChannelUser, Message, rightType } from "./entities";
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
import { Penality } from "./entities/Penality.entity";
import { CreatePenalityDTO } from "./dtos/Penality.dto";
import { PenalityService } from "./penality/penality.service";
import { GeneralService } from "src/general/general.service";

interface InvitationType {
    id: number;
    type: "Friend" | "Channel";
    name: string;
    image: string;
}

const ROOM_PREFIX = "room-";

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    //private onlineUsers = new Map<number, Socket>();

    constructor(
        private userService: UsersService,
        private channelService: ChannelService,
        private channelUserService: ChannelUserService,
        private friendService: FriendService,
        private messageService: MessageService,
        private penalityService: PenalityService,
        private generalService: GeneralService
    ) {}

    @SubscribeMessage("test")
    async test(@MessageBody() data: any) {
        console.log("---------TEST--------");

        console.log("-------END TEST------");
        console.log("TEST  ", this.server.sockets.sockets);
        return this.server.sockets.sockets;
    }

    // @SubscribeMessage("chatConnection")
    // async chatConnection(
    //     @MessageBody("userid") userid: number,
    //     @ConnectedSocket() client: Socket
    // ) {
    //     // console.log("connection of user : ", userId);
    //     // console.log("socket : ", client.id);
    //     this.onlineUsers.set(userid, client);
    //     client.data.userid = userid;
    // }

    @SubscribeMessage("joinRoom")
    async joinRoom(
        @MessageBody("userid") userId: number,
        @MessageBody("channelid") channelid: number,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const messages = await this.messageService.getNLastMessage({
            id: channelid,
            nb: 25,
        });
        // this.connectedUser.set(userId, client);
        // console.log("map:", this.connectedUser)
        client.emit("NLastMessage", messages);
        client.join(ROOM_PREFIX + channelid);
        return ROOM_PREFIX + channelid + " joined";
    }

    @SubscribeMessage("leaveRoom")
    leaveRoom(
        @MessageBody("userid") userid: number,
        @MessageBody("channelid") channelid: number,
        @ConnectedSocket() client: Socket
    ) {
        // console.log(userid + "left room-" + channelid);
        // console.log("socket.id: ", client.id)
        // this.connectedUser.delete(userid)
        // console.log("map:", this.connectedUser)
        client.leave(ROOM_PREFIX + channelid);
        return ROOM_PREFIX + channelid + " left";
    }

    // ========================================================================
    //                               Channel
    // ========================================================================

    @SubscribeMessage("newChannel")
    async createChannel(
        @MessageBody("newChannel") channel: CreateChannelDto,
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
            client.emit("Channel", channel);
        } catch (error) {
            return `Channel Name already in use`;
        }
        return `OK`;
    }

    @SubscribeMessage("getChannels")
    async getChannels(
        @MessageBody("userid") userid: number,
        @MessageBody("isPending") isPending: boolean
    ) {
        return await this.channelService.getChannels(userid, isPending);
    }

    // ========================================================================
    //                               Channel User
    // ========================================================================

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(
        @MessageBody("channelId") channelId: number
    ): Promise<UserDTO[]> {
        const users = (
            await this.channelUserService.getChannelUsers(channelId, false)
        ).map((channelUser) => ({
            ...channelUser.user,
            rights: channelUser.rights,
            channelUserId: channelUser.id,
            connected: this.generalService
                .getUsersOnline()
                .has(channelUser.user.id),
            //connected: this.onlineUsers.has(channelUser.user.id),
        }));
        return users;
    }

    @SubscribeMessage("inviteChannelUser")
    async inviteContact(
        @MessageBody("username") username: string,
        @MessageBody("channelId") channelId: number
    ): Promise<string> {
        const user = await this.userService.findUser(username);
        if (user === null) return "error: User " + username + " not Found";
        const channelUser = await this.channelUserService.createChannelUser({
            userId: user.id,
            channelId: channelId,
            rights: rightType.NORMAL,
            isPending: true,
        });
        if (channelUser === undefined)
            return `${username} already in channel or is pending`;
        //if (this.onlineUsers.has(user.id))
        //    this.onlineUsers[user.id].emit("pendings", {
        if (this.generalService.getUsersOnline().has(user.id))
            this.generalService.getUsersOnline()[user.id].emit("pendings", {
                id: channelUser.id,
                type: "Channel",
                name: channelUser.channel.name,
                image: channelUser.channel.image,
            });
        return `User ${channelUser.user.username} invited`;
    }

    @SubscribeMessage("updateChannelUser")
    async updateChannelUser(
        @MessageBody("id") channelUserId: number,
        @MessageBody("accept") accept: boolean
    ): Promise<string | ChannelUserDTO> {
        const channelUser = await this.channelUserService.updateChannelUser({
            id: channelUserId,
            isPending: false,
        });
        if (accept) {
            const user = {
                id: channelUser.user.id,
                username: channelUser.user.username,
                avatar: channelUser.user.avatar,
                rights: channelUser.rights,
                channelUserId: channelUser.id,
                connected: this.generalService
                    .getUsersOnline()
                    .has(channelUser.user.id),
                //connected: this.onlineUsers.has(channelUser.user.id),
            };
            if (channelUser !== undefined)
                this.server
                    .to(ROOM_PREFIX + channelUser.channel.id)
                    .emit("ChannelUser", user);
            return channelUser;
        }
        this.server
            .to(ROOM_PREFIX + channelUser.channel.id)
            .emit("RemoveChannelUser", channelUserId);
        const res = await this.channelUserService.deleteChannelUser(
            channelUserId
        );
        return res;
    }

    @SubscribeMessage("deleteChannelUser")
    async deleteChannelUser(@MessageBody("id") id: number): Promise<string> {
        const channelUser = await this.channelUserService.findChannelUserById(
            Number(id)
        );
        this.server
            .to(ROOM_PREFIX + channelUser.channel.id)
            .emit("RemoveChannelUser", channelUser.id);
        return await this.channelUserService.deleteChannelUser(Number(id));
    }

    // ========================================================================
    //                               FRIEND
    // ========================================================================

    @SubscribeMessage("getFriends")
    async getFriendsPending(
        @MessageBody() userId: number
    ): Promise<FriendDTO[]> {
        const friends = await this.friendService.getFriends(userId);
        return friends;
    }

    @SubscribeMessage("inviteFriend")
    async inviteFriend(
        @MessageBody("userid") userId: number,
        @MessageBody("friendname") friendName: string
    ): Promise<string> {
        const friendUser = await this.userService.findUser(friendName);
        if (friendUser === null)
            return "error: User" + friendName + " not Found";
        if (friendUser.id === userId) return "error: can't invite yourself";
        const friend = await this.friendService.createFriend({
            userId: userId,
            friendId: friendUser.id,
        });

        if (friend === undefined) return "error: friends already or is pending";
        // if (this.onlineUsers.has(friendUser.id))
        //     this.onlineUsers[friendUser.id].emit("pendings", {
        //         id: friend.id,
        //         type: "Channel",
        //         name: friend.user.username,
        //         image: friend.user.avatar,
        //     })
        return `${friendName} invited`;
    }

    @SubscribeMessage("updateFriend")
    async updateFriend(
        @MessageBody("id") friendId: number,
        @MessageBody("accept") accept: boolean,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const updatedFriend = await this.friendService.updateFriend({
            id: Number(friendId),
            isPending: false,
        });
        if (updatedFriend === undefined) return "Something went wrong";
        const friend = {
            id: updatedFriend.friend.id,
            username: updatedFriend.friend.username,
            avatar: updatedFriend.friend.avatar,
            friendId: updatedFriend.id,
        };
        const user = {
            id: updatedFriend.user.id,
            username: updatedFriend.user.username,
            avatar: updatedFriend.user.avatar,
            friendId: updatedFriend.id,
        };
        if (accept) {
            //do not work
            // if (this.onlineUsers[updatedFriend.user.id]) {
            //     this.onlineUsers[updatedFriend.user.id]?.emit("friend", friend);
            // }
            if (this.generalService.getUsersOnline()[updatedFriend.user.id]) {
                this.generalService
                    .getUsersOnline()
                    [updatedFriend.user.id]?.emit("friend", friend);
            }
            return `friendhip with ${user.username} accepted`;
        }
        const res = await this.friendService.deleteFriend(friendId);
        client.emit("removeFriend", friendId);
        //this.onlineUsers[updatedFriend.user.id]?.emit("removeFriend", friendId);
        this.generalService
            .getUsersOnline()
            [updatedFriend.user.id]?.emit("removeFriend", friendId);
        return `friendship with ${user.username} declined`;
    }

    @SubscribeMessage("deleteFriend")
    async deleteFriend(@MessageBody("id") friendId: number): Promise<string> {
        const friend = await this.friendService.findFriend(Number(friendId));
        const userId1 = friend.user.id;
        const userId2 = friend.friend.id;
        //this.onlineUsers[userId1]?.emit("removeFriend", friendId);
        //this.onlineUsers[userId2]?.emit("removeFriend", friendId);
        this.generalService
            .getUsersOnline()
            [userId1]?.emit("removeFriend", friendId);
        this.generalService
            .getUsersOnline()
            [userId2]?.emit("removeFriend", friendId);
        return (await this.friendService.deleteFriend(friendId)) !== -1
            ? "friend deleted"
            : "error";
    }

    // ========================================================================
    //                               MESSAGE
    // ========================================================================

    @SubscribeMessage("createMessage")
    async createMessage(
        @MessageBody() messageDTO: CreateMessageDto,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const user = await this.userService.findUserId(messageDTO.userId);
        const channel = await this.channelService.findChannelById(
            messageDTO.channelId
        );
        const newMessage = await this.messageService.createMessage(
            user,
            channel,
            messageDTO.content
        );
        if (newMessage === undefined) return "could not write message";
        const room = ROOM_PREFIX + channel.id;
        const message = {
            id: newMessage.id,
            creator: {
                id: newMessage.creator.id,
                username: newMessage.creator.username,
                avatar: newMessage.creator.avatar,
            },
            content: newMessage.content,
            createdAt: newMessage.createdAt,
            modifiedAt: newMessage.modifiedAt,
        };
        this.server.to(room).emit("messageListener", message);
        return "message created";
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
        console.log("Disconnection of ", client.id);
    }

    afterInit(server: Server) {
        console.log("Socket.IO server initialized");
    }

    // ========================================================================
    //                               Invitations
    // ========================================================================

    @SubscribeMessage("getPendings")
    async getPendings(
        @MessageBody("userId") userId: number
    ): Promise<InvitationType[]> {
        const friends = await this.friendService.getFriendsPending(userId);
        const channels = await this.channelUserService.getChannelUsersByUserId(
            userId,
            true
        );
        console.log("friends: ", friends);
        console.log("channels: ", channels);
        const invitations: InvitationType[] = friends.map(
            (friend: FriendDTO) => ({
                id: friend.id,
                type: "Friend",
                name: friend.user.username,
                image: friend.user.avatar ?? "",
            })
        );
        const channelInvitations: InvitationType[] = channels.map(
            (channelUser: ChannelUser) => ({
                id: channelUser.id,
                type: "Channel",
                name: channelUser.channel.name,
                image: channelUser.channel.image ?? "",
            })
        );
        channelInvitations.forEach((channel) => {
            invitations.push(channel);
        });
        return invitations;
    }

    @SubscribeMessage("createPenality")
    async createPenality(
        @MessageBody("penality") penality: CreatePenalityDTO
    ): Promise<Penality> {
        const newPenality = await this.penalityService.createPenality(penality);
        return newPenality;
    }
}
