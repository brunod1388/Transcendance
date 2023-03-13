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
        private userService: UsersService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createFriend(friendDetails: CreateFriendDTO): Promise<string> {
        const user = await this.userService.findUserId(friendDetails.userId);
        const friend = await this.userService.findUserId(
            friendDetails.friendId
        );
        if (friend === undefined || user === undefined) return undefined;
        const newFriend = await this.friendRepository.create({
            user: user,
            friend: friend,
            isPending: true,
        });
        await this.friendRepository.save(newFriend);
        return "friend created";
    }

    async updateFriend(friendDto: FriendDTO): Promise<string> {
        const friend = await this.friendRepository.findOne({
            where: {
                id: friendDto.id,
                isPending: friendDto.isPending,
            },
        });
        if (friend === undefined) return "Frienship never sent";
        friend.isPending = false;
        await this.friendRepository.save(friend);
        return "Friend accepted";
    }

    async getFriends(userId: number): Promise<UserDTO[]> {
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
        const friends = friends1.map((friend) => friend.friend);
        friends.concat(friends2.map((friend) => friend.user));
        console.log(friends);
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

    async deleteFriend(friendDto: FriendDTO): Promise<string> {
        const res = await this.friendRepository.delete({ id: friendDto.id });
        return "friend deleted";
    }
}
