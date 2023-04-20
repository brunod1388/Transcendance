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
import { ChannelType, ChannelUser, Message, rightType } from "./entities";
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
        //origin: ["http://localhost:9000"],
        origin: [process.env.REACT_APP_FRONTEND_URL],
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

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
        @MessageBody("isPending") isPending: boolean,
        @MessageBody("isPrivate") isPrivate: boolean
    ) {
        return await this.channelService.getChannels(
            userid,
            isPending,
            isPrivate
        );
    }

    @SubscribeMessage("getPrivateUsers")
    async getPrivateChannels(
        @ConnectedSocket() client: Socket
    ): Promise<UserDTO[]> {
        return this.channelUserService.getPrivateUsers(
            Number(client.data.user.id)
        );
    }

    @SubscribeMessage("privateMessage")
    async privateMessage(
        @MessageBody("senderId") senderId: number,
        @MessageBody("receiverId") receiverId: number,
        @ConnectedSocket() client: Socket
    ) {
        const userId = client.data.user.id;
        const channel = await this.channelService.getPrivateChannel(
            senderId,
            receiverId
        );
        if (channel !== undefined) return channel;
        const newPrivateChannel = await this.channelService.createChannel({
            ownerId: senderId,
            name: `private ${senderId}-${receiverId}`,
            type: ChannelType.PRIVATE,
            password: null,
        });
        const senderChannelUser = {
            userId: senderId,
            channelId: newPrivateChannel.id,
            rights: rightType.ADMIN,
            isPending: false,
        };
        this.channelUserService.createChannelUser(senderChannelUser);
        const receiverChannelUser = {
            ...senderChannelUser,
            userId: receiverId,
        };
        this.channelUserService.createChannelUser(receiverChannelUser);
        return newPrivateChannel;
    }
    // ========================================================================
    //                               Channel User
    // ========================================================================

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(
        @MessageBody("channelId") channelId: number
    ): Promise<UserDTO[]> {
        const channel = await this.channelService.findChannelById(channelId);
        const users = (
            await this.channelUserService.getChannelUsers(channelId, false)
        ).map((channelUser) => ({
            ...channelUser.user,
            rights:
                channelUser.user.id === channel.owner.id
                    ? "owner"
                    : channelUser.rights,
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
        if (this.generalService.getUsersOnline().has(user.id)) {
            this.server.sockets.sockets.forEach((socket) => {
                if (socket.data.user.id === user.id)
                    socket.emit("pendings", {
                        id: channelUser.id,
                        type: "Channel",
                        name: channelUser.channel.name,
                        image: channelUser.channel.image,
                    });
            });
        }
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
        let friendSocket = undefined;
        this.server.sockets.sockets.forEach((socket) => {
            if (socket.data.user.id == friend.friend.id) friendSocket = socket;
        });
        if (friendSocket) {
            console.log("friend", friend);
            friendSocket.emit("pendings", {
                id: friend.id,
                type: "Friend",
                name: friend.user.username,
                image: friend.user.avatar,
            });
        }
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
        let userSocket = undefined;
        this.server.sockets.sockets.forEach((socket) => {
            if (socket.data.user.id == updatedFriend.user.id)
                userSocket = socket;
        });
        if (accept) {
            userSocket?.emit("friend", { ...friend, friendId: friendId });
            return `friendhip with ${user.username} accepted`;
        }
        const res = await this.friendService.deleteFriend(friendId);
        // client.emit("removeFriend", friendId);
        // userSocket?.emit("removeFriend", friendId);
        return `friendship with ${user.username} declined`;
    }

    @SubscribeMessage("deleteFriend")
    async deleteFriend(
        @MessageBody("id") friendId: number,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const friend = await this.friendService.findFriend(Number(friendId));
        if (friend === undefined) return "error";
        const userId = friend.user.id;
        const userFriendId = friend.friend.id;

        let friendSocket = undefined;
        let userSocket = undefined;
        this.server.sockets.sockets.forEach((socket) => {
            if (socket.data.user.id == userId) userSocket = socket;
            if (socket.data.user.id == userFriendId) friendSocket = socket;
        });
        userSocket?.emit("removeFriend", friendId);
        friendSocket?.emit("removeFriend", friendId);
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
