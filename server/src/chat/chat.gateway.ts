import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";
import { UsersService } from "../users/users.service";
import { ChannelDto, CreateChannelDto } from "./dtos/Channel.dto";
import { ChannelService } from "./channel/channel.service";
import { ChannelUserService } from "./channelUser/channelUsers.service";
import {
    Channel,
    ChannelType,
    ChannelUser,
    Message,
    rightType,
} from "./entities";
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
import { GeneralService } from "src/general/general.service";
import { BlockedUserService } from "./blockedUser/blockedUser.service";
import { MutedUserService } from "./mutedUser/mutedUser.service";
import { CreateBlockedUserDTO, unblockUserDTO } from "./dtos/BlockedUser.dto";
import { CreateMutedUserDTO, unmuteUserDTO } from "./dtos/MutedUser.dto";
import * as argon from "argon2";

interface InvitationType {
    id: number;
    type: "Friend" | "Channel";
    name: string;
    image: string;
}

const ROOM_PREFIX = "room-";

@WebSocketGateway({
    cors: {
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
        private generalService: GeneralService,
        private blockedUserService: BlockedUserService,
        private mutedUserService: MutedUserService
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
            if (channel.type === "protected")
                channel.password = await argon.hash(channel.password);
            console.log(channel);
            const newChannel = await this.channelService.createChannel(channel);
            await this.channelUserService.createChannelUser({
                channelId: newChannel.id,
                userId: newChannel.owner.id,
                rights: rightType.ADMIN,
                isPending: false,
            });
            console.log("newChannel", newChannel);
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
        @MessageBody("isPrivate") isPrivate: boolean,
        @ConnectedSocket() client: Socket
    ) {
        const channels = await this.channelService.getChannels(
            userid,
            isPending,
            isPrivate
        );
        const blocked = await this.blockedUserService.getBlockedUsersByUserID(
            Number(userid)
        );
        const blockedID = [];
        const now = new Date(Date.now());
        blocked.forEach((element) => {
            if (new Date(element.endDate) > now)
                blockedID.push(Number(element.channelID));
        });
        if (!blockedID.length) return channels;
        const filteredChannels = channels.filter(
            (channel) => !blockedID.includes(Number(channel.id))
        );
        return filteredChannels;
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
        @MessageBody("receiverId") receiverId: number,
        @ConnectedSocket() client: Socket
    ): Promise<ChannelDto> {
        const senderId = client.data.user.id;
        const channel = await this.channelService.getPrivateChannel(
            senderId,
            receiverId
        );
        if (channel) return channel;
        const name =
            "private " +
            (senderId < receiverId
                ? `${senderId}-${receiverId}`
                : `${receiverId}-${senderId}`);
        const newPrivateChannel = await this.channelService.createChannel({
            ownerId: senderId,
            name: name,
            type: ChannelType.PRIVATE,
            password: null,
        });
        const senderChannelUser = {
            userId: senderId,
            channelId: newPrivateChannel.id,
            rights: rightType.ADMIN,
            isPending: false,
        };
        await this.channelUserService.createChannelUser(senderChannelUser);
        const receiverChannelUser = {
            ...senderChannelUser,
            userId: receiverId,
        };
        await this.channelUserService.createChannelUser(receiverChannelUser);
        return newPrivateChannel;
    }

    @SubscribeMessage("searchChannel")
    async searchChannel(
        @MessageBody("channelName") channelName: string,
        @ConnectedSocket() client: Socket
    ): Promise<ChannelDto[]> {
        const searchChannels = await this.channelService.findChannelByName(
            channelName
        );
        const userChannels = await this.channelService.getChannels(
            client.data.user.id,
            false,
            false
        );
        return searchChannels.filter((channel) => {
            for (const userChannel of userChannels)
                if (channel.id === userChannel.id) return false;
            return true;
        });
    }

    @SubscribeMessage("joinChannel")
    async joinChannel(
        @MessageBody("channelId") channelId: number,
        @MessageBody("password") password: string,
        @ConnectedSocket() client: Socket
    ): Promise<ChannelDto | string> {
        const channelAdded = await this.channelService.findChannelById(
            channelId
        );
        if (channelAdded.type === "protected" &&
            ! (await this.channelService.checkPassword(channelId, password)))
            return "Wrong password";
        const channelUser = await this.channelUserService.createChannelUser({
            userId: client.data.user.id,
            channelId: channelId,
            rights: rightType.NORMAL,
            isPending: false,
        });
        if (!channelUser) return "Could not add you to channel";
        if (channelAdded == undefined) return "Something went wrong!";
        client.emit("Channel", channelAdded);
        return channelAdded;
    }

    @SubscribeMessage("deleteChannel")
    async deleteChannel(
        @MessageBody("channelId") channelId: number,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const channel = await this.channelService.findChannelById(
            Number(channelId)
        );
        const user = await this.userService.findUserId(client.data.user.id);
        if (channel === undefined) return "Channel does not exist";
        if (user === undefined) return "Can't find userProfile";
        if (user.id !== channel.owner.id)
            return "You don't have the right to delete this channel";
        this.channelService.deleteChannel(channel);
        return "Channel deleted";
    }
    // ========================================================================
    //                               Channel User
    // ========================================================================

    @SubscribeMessage("getChannelUsers")
    async getChannelUsers(
        @MessageBody("channelId") channelId: number,
        @ConnectedSocket() client: Socket
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
            inGame: this.generalService.isUserInGame(channelUser.user.id),
            //connected: this.onlineUsers.has(channelUser.user.id),
        }));
        const blocked = await this.blockedUserService.getBlockedUsers(
            channelId
        );
        const blockedID = [];
        const now = new Date(Date.now());
        if (blocked !== undefined && blocked !== null) {
            blocked.forEach((element) => {
                if (new Date(element.endDate) > now)
                    blockedID.push(Number(element.userID));
            });
        }
        console.log("Blocked users in getChannelUsers: ", blockedID);
        console.log("UserID emitted getChannelUsers: ", client.data.user.id);
        console.log(
            "Include check: ",
            blockedID.includes(Number(client.data.user.id))
        );
        if (blockedID.includes(Number(client.data.user.id)) === false)
            return users;
        const filteredUsers = users.filter(
            (user) => !blockedID.includes(Number(user.id))
        );
        console.log("Filtered users in getChannelUsers ", filteredUsers);
        return filteredUsers;
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

                inGame: this.generalService.isUserInGame(channelUser.user.id),
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

    @SubscribeMessage("updateRight")
    async makeAdmin(
        @MessageBody("channelUserId") channelUserId: number,
        @MessageBody("rights") rights: rightType,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const channelUser = await this.channelUserService.findChannelUserById(
            channelUserId
        );
        const channel = await this.channelService.findChannelById(
            channelUser.channel.id
        );
        if (channelUser === undefined) return "User not Found";
        if (channel.owner.id !== client.data.user.id)
            return "You don't have the right to do this!";
        const newChannelUser = await this.channelUserService.updateChannelUser({
            ...channelUser,
            rights: rights,
        });
        const room = ROOM_PREFIX + channel.id;
        this.server.to(room).emit("ChannelUser", {
            id: newChannelUser.user.id,
            username: newChannelUser.user.username,
            avatar: newChannelUser.user.avatar,
            channelUserId: newChannelUser.id,
            rights: newChannelUser.rights,
            connected: this.generalService
                .getUsersOnline()
                .has(newChannelUser.user.id),
            inGame: this.generalService.isUserInGame(newChannelUser.user.id),
        });
        return `${channelUser.user.username} has been updated to ${rights}`;
    }

    // ========================================================================
    //                               FRIEND
    // ========================================================================

    @SubscribeMessage("getFriends")
    async getFriendsPending(
        @MessageBody() userId: number
    ): Promise<FriendDTO[]> {
        const friends = await this.friendService.getFriends(userId);
        const newFriends = Array<FriendDTO>();
        friends.forEach((friend) => {
            newFriends.push({
                ...friend,
                connected: this.generalService.isUserOnline(friend.id),
                inGame: this.generalService.isUserInGame(friend.id),
            });
        });
        return newFriends;
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
        const blocked = await this.blockedUserService.checkIfBlocked(
            messageDTO.userId,
            messageDTO.channelId
        );
        const muted = await this.mutedUserService.checkIfMuted(
            messageDTO.userId,
            messageDTO.channelId
        );
        const now = new Date(Date.now());
        if (
            (blocked !== undefined &&
                blocked !== null &&
                new Date(blocked.endDate) > now) ||
            (muted !== undefined &&
                muted !== null &&
                new Date(muted.endDate) > now)
        )
            return "user is muted/blocked";
        const newMessage = await this.messageService.createMessage(
            user,
            channel,
            messageDTO.content
        );
        if (newMessage === undefined) return "could not write message";
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
        const room = ROOM_PREFIX + channel.id;
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

    // ========================================================================
    //                               Block
    // ========================================================================

    @SubscribeMessage("blockUser")
    async blockUser(
        client: Socket,
        data: CreateBlockedUserDTO
    ): Promise<string> {
        const clientUser = await this.channelUserService.checkIfChannelUser(
            Number(client.data.user.id),
            Number(data.channelId)
        );
        if (clientUser === undefined || clientUser === null)
            return "Client User not found";
        if (clientUser.rights === rightType.NORMAL)
            return "You don't have the right to block users";
        const check = await this.blockedUserService.checkIfBlocked(
            data.userId,
            data.channelId
        );
        const now = new Date(Date.now());

        if (check !== undefined && check !== null) {
            await this.blockedUserService.deleteBlockedUser(Number(check.id));
            if (new Date(data.endDate) <= now)
                return "The user has been unblocked";
        }
        const blockedUser = await this.blockedUserService.createBlockedUser(
            data
        );
        if (blockedUser === undefined)
            return (
                "Failed to block user with ID " +
                data.userId +
                " on channel with ID " +
                data.channelId
            );
        if (this.generalService.getUsersOnline().has(data.userId)) {
            this.server.sockets.sockets.forEach((socket) => {
                if (socket.data.user.id === data.userId)
                    socket.leave(ROOM_PREFIX + data.channelId);
            });
        }
        return (
            "User with ID " +
            data.userId +
            " has been blocked on channel with ID " +
            data.channelId
        );
    }

    @SubscribeMessage("unblockUser")
    async unblockUser(client: Socket, data: unblockUserDTO): Promise<string> {
        const clientUser = await this.channelUserService.checkIfChannelUser(
            Number(client.data.user.id),
            Number(data.channelId)
        );
        if (clientUser === undefined || clientUser === null)
            return "Client User not found";
        if (clientUser.rights === rightType.NORMAL)
            return "You don't have the right to unblock users";
        const user2unblock = await this.channelUserService.findChannelUserById(
            Number(data.channelUserId)
        );
        if (user2unblock === undefined || user2unblock === null)
            return "Unblock target channel user not found";
        const check = await this.blockedUserService.checkIfBlocked(
            Number(user2unblock.user.id),
            Number(data.channelId)
        );
        if (check !== undefined && check !== null) {
            await this.blockedUserService.deleteBlockedUser(Number(check.id));
            return (
                "ChannelUser with ID " +
                data.channelUserId +
                " has been unblocked on channel with ID " +
                data.channelId
            );
        }
        return (
            "Failed to unblock channelUser with ID " +
            data.channelUserId +
            " on channel with ID " +
            data.channelId +
            " as no existing block detected"
        );
    }

    // ========================================================================
    //                               Mute
    // ========================================================================

    @SubscribeMessage("muteUser")
    async muteUser(client: Socket, data: CreateMutedUserDTO): Promise<string> {
        const clientUser = await this.channelUserService.checkIfChannelUser(
            Number(client.data.user.id),
            Number(data.channelId)
        );
        if (clientUser === undefined || clientUser === null)
            return "Client User not found";
        if (clientUser.rights === rightType.NORMAL)
            return "You don't have the right to mute users";
        const check = await this.mutedUserService.checkIfMuted(
            data.userId,
            data.channelId
        );
        const now = new Date(Date.now());
        if (check !== undefined && check !== null) {
            await this.mutedUserService.deleteMutedUser(Number(check.id));
            if (new Date(data.endDate) <= now)
                return "The user has been unmuted";
        }
        const mutedUser = await this.mutedUserService.createMutedUser(data);
        if (mutedUser === undefined)
            return (
                "Failed to mute user with ID " +
                data.userId +
                " on channel with ID " +
                data.channelId
            );
        return (
            "User with ID " +
            data.userId +
            " has been muted on channel with ID " +
            data.channelId
        );
    }

    @SubscribeMessage("unmuteUser")
    async unmuteUser(client: Socket, data: unmuteUserDTO): Promise<string> {
        const clientUser = await this.channelUserService.checkIfChannelUser(
            Number(client.data.user.id),
            Number(data.channelId)
        );
        if (clientUser === undefined || clientUser === null)
            return "Client User not found";
        if (clientUser.rights === rightType.NORMAL)
            return "You don't have the right to unmute users";
        const user2unmute = await this.channelUserService.findChannelUserById(
            Number(data.channelUserId)
        );
        if (user2unmute === undefined || user2unmute === null)
            return "Unmute target channel user not found";
        const check = await this.mutedUserService.checkIfMuted(
            Number(user2unmute.user.id),
            Number(data.channelId)
        );
        if (check !== undefined && check !== null) {
            await this.mutedUserService.deleteMutedUser(Number(check.id));
            return (
                "ChannelUser with ID " +
                data.channelUserId +
                " has been unmuted on channel with ID " +
                data.channelId
            );
        }
        return (
            "Failed to unmute channelUser with ID " +
            data.channelUserId +
            " on channel with ID " +
            data.channelId +
            " as no existing mute detected"
        );
    }
}
