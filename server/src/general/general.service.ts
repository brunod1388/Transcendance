import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Socket, Server, RemoteSocket } from "socket.io";
import { InvitationDto } from "./dto/invitation.dto";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/User.entity";
import { CreateMatchDto } from "src/match/dtos/Match.dto";
import { ResponseDto } from "./dto/response.dto";
import { ChannelUserService } from "src/chat/channelUser/channelUsers.service";
import { ChannelService } from "src/chat/channel/channel.service";
import { FriendService } from "src/users/friend/friend.service";
import { FriendDTO } from "src/users/dtos/Friend.dto";

@Injectable()
export class GeneralService {
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService;
    @Inject(forwardRef(() => ChannelService))
    private channelService: ChannelService;
    @Inject(forwardRef(() => ChannelUserService))
    private channelUserService: ChannelUserService;
    @Inject(forwardRef(() => FriendService))
    private friendsService: FriendService;

    // usersOnline:
    // =====================================================
    static usersOnline = new Map<number, Socket>();

    addUserOnline(userId: number, socket: Socket) {
        GeneralService.usersOnline.set(userId, socket);
    }

    removeUserOnline(userId: number) {
        GeneralService.usersOnline.delete(userId);
    }

    isUserOnline(userId: number) {
        return GeneralService.usersOnline.has(userId);
    }

    getUsersOnline(): Map<number, Socket> {
        const ret = GeneralService.usersOnline;
        return ret;
    }

    // usersInGame:
    // =====================================================
    static usersInGame = new Array<number>();

    addUserInGame(userId: number) {
        GeneralService.usersInGame.push(userId);
    }

    removeUserInGame(userId: number) {
        console.log("before", GeneralService.usersInGame);
        GeneralService.usersInGame = GeneralService.usersInGame.filter(
            (id) => id !== userId
        );
        console.log("after", GeneralService.usersInGame);
    }

    isUserInGame(userId: number) {
        return GeneralService.usersInGame.includes(userId);
    }

    getUsersInGame() {
        const ret = GeneralService.usersInGame;
        return ret;
    }

    // Socket events:
    // =====================================================
    connection(server: Server, socket: Socket) {
        this.addUserOnline(socket.data.user.id, socket);
        this.updateUserStatus(server, socket);
    }

    disconnection(server: Server, socket: Socket, reason: any) {
        this.removeUserOnline(socket.data.user.id);
        this.removeUserInGame(socket.data.user.id);
        this.updateUserStatus(server, socket);
        socket.disconnect();
    }

    joinRoom(client: Socket | RemoteSocket<any, any>, room: string) {
        client.join(room);
    }

    leaveRoom(client: Socket, room: string) {
        client.leave(room);
    }

    // User status:
    // =====================================================
    async updateUserStatus(server: Server, socket: Socket) {
        const userId = socket.data.user.id;
        const connected = this.isUserOnline(userId);
        const privateChannels = await this.channelService.getChannels(
            userId,
            false,
            true
        );
        const publicChannels = await this.channelService.getChannels(
            userId,
            false,
            false
        );

        publicChannels.forEach(async (channel) => {
            const users = await this.channelUserService.getChannelUsers(
                channel.id,
                false
            );
            const channelUser = users.find((user) => user.user.id === userId);
            const user = {
                id: channelUser.user.id,
                username: channelUser.user.username,
                avatar: channelUser.user.avatar,
                rights: channelUser.rights,
                channelUserId: channelUser.id,
                connected: connected,
                inGame: this.isUserInGame(userId),
            };
            server.to("room-" + channel.id).emit("ChannelUser", user);
        });

        privateChannels.forEach(async (channel) => {
            const users = await this.channelUserService.getChannelUsers(
                channel.id,
                false
            );
            const channelUser = users.find((user) => user.user.id === userId);
            const friend = users.find((user) => user.user.id !== userId);
            const user = {
                id: channelUser.user.id,
                username: channelUser.user.username,
                avatar: channelUser.user.avatar,
                rights: channelUser.rights,
                channelUserId: channelUser.id,
                connected: connected,
                inGame: this.isUserInGame(userId),
            };
            const all_sockets = await server.sockets.fetchSockets();
            all_sockets.forEach((socket) => {
                if (socket.data.user.id === friend.user.id) {
                    server.to(socket.id).emit("PrivateUser", user);
                }
            });
        });

        const friends = await this.friendsService.getFriends(userId);
        friends.forEach(async (friend) => {
            const friendUser = await this.userService.findUserId(friend.id);
            const friendFriends = await this.friendsService.getFriends(
                friend.id
            );
            const userBeforeStatut = friendFriends.find((f) => f.id === userId);
            const user = {
                ...userBeforeStatut,
                connected: this.isUserOnline(userId),
                inGame: this.isUserInGame(userId),
            };
            const all_sockets = await server.sockets.fetchSockets();

            all_sockets.forEach((socket) => {
                if (socket.data.user.id === friend.id) {
                    server.to(socket.id).emit("friend", user);
                }
            });
        });
    }

    //  Pong game invitations:
    // =====================================================
    async handleInvitation(
        server: Server,
        client: Socket,
        invitation: InvitationDto
    ) {
        const user = await this.userService.findUserId(client.data.user.id);
        server.emit("invitation", {
            ...invitation,
            user: { avatar: user.avatar, username: user.username, id: user.id },
        });
    }

    async handleResponse(
        server: Server,
        client: Socket,
        response: ResponseDto
    ) {
        const user = await this.userService.findUserId(client.data.user.id);
        server.emit("response", {
            ...response,
            username: user.username,
            avatar: user.avatar,
        });
    }

    // Utils pong game:
    // =====================================================
    async obtainOpponentSocket(client: Socket, server: Server, room: string) {
        const socks = await server.in(room).fetchSockets();

        for (const socket of socks) {
            if (socket.id !== client.id) {
                if (socket !== undefined) {
                    return socket;
                }
            }
        }
        return undefined;
    }

    async obtainOpponentInfo(client: Socket, server: Server, room: string) {
        const opponentSocket = await this.obtainOpponentSocket(
            client,
            server,
            room
        );
        if (opponentSocket !== undefined) {
            const me: User = await this.userService.findUserId(
                client.data.user.id
            );
            const opponent: User = await this.userService.findUserId(
                opponentSocket.data.user.id
            );
            opponentSocket.emit("set-opponent-info", {
                id: me.id,
                username: me.username,
            });
            client.emit("set-opponent-info", {
                id: opponent.id,
                username: opponent.username,
            });
        }
    }
}
