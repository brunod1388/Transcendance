import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Friend } from "../entities/Friend.entity";
import { UsersService } from "../users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFriendDTO, FriendDTO } from "../dtos/Friend.dto";
import { User } from "../entities/User.entity";
import { UserDTO } from "../dtos/User.dto";

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepository: Repository<Friend>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) {}

    async createFriend(
        friendDetails: CreateFriendDTO
    ): Promise<FriendDTO | undefined> {
        const user = await this.userService.findUserId(friendDetails.userId);
        const friendUser = await this.userService.findUserId(
            friendDetails.friendId
        );
        if (friendUser === undefined || user === undefined) return undefined;
        const test = await this.friendRepository.findOne({
            relations: {
                friend: true,
                user: true,
            },
            where: {
                user: { id: friendUser.id },
                friend: { id: user.id },
            },
        });
        if (test) return undefined;
        const newFriend = await this.friendRepository.create({
            user: user,
            friend: friendUser,
            isPending: true,
        });
        try {
            return await this.friendRepository.save(newFriend);
        } catch (error) {
            return undefined;
        }
    }

    async updateFriend(friendDto: FriendDTO): Promise<FriendDTO> {
        const friend = await this.friendRepository.findOne({
            relations: { user: true, friend: true },
            where: {
                id: friendDto.id,
            },
        });
        if (friend === undefined) return friend;
        friend.isPending = friendDto.isPending;
        await this.friendRepository.save(friend);
        return friend;
    }

    async getFriends(userId: number): Promise<FriendDTO[]> {
        const friends1 = await this.friendRepository.find({
            relations: { user: true, friend: true },
            where: [{ user: { id: userId }, isPending: false }],
            select: {
                friend: { id: true, username: true, avatar: true },
            },
        });
        const friends2 = await this.friendRepository.find({
            relations: { user: true, friend: true },
            where: [{ friend: { id: userId }, isPending: false }],
            select: {
                user: { id: true, username: true, avatar: true },
            },
        });
        let friends = friends1.map((friend) => ({
            friendId: friend.id,
            username: friend.friend.username,
            avatar: friend.friend.avatar,
            id: friend.friend.id,
        }));
        friends = friends.concat(
            friends2.map((friend) => ({
                friendId: friend.id,
                username: friend.user.username,
                avatar: friend.user.avatar,
                id: friend.user.id,
            }))
        );
        return friends;
    }

    async getFriendsPending(userId: number): Promise<FriendDTO[]> {
        const friends = await this.friendRepository.find({
            relations: { user: true },
            where: { friend: { id: userId }, isPending: true },
            select: { id: true, user: { username: true, avatar: true } },
        });
        return friends;
    }

    async findFriend(friendId: number): Promise<Friend> {
        const friend = await this.friendRepository.findOne({
            relations: { user: true, friend: true },
            where: { id: friendId },
        });
        return friend;
    }

    async deleteFriend(friendId: number): Promise<number> {
        const friend = await this.friendRepository.findOne({
            where: { id: friendId },
        });
        if (friend === undefined) return -1;
        const res = await this.friendRepository.delete({ id: friendId });
        return friendId;
    }
}
