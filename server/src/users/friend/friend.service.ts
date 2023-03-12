import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Friend } from "../entities/Friend.entity";
import { UsersService } from "../users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFriendDTO, FriendDTO } from "../dtos/Friend.dto";
import { User } from "../entities/User.entity";

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

    async handleFriendship(friendDto: FriendDTO): Promise<string> {
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

    async getFriends(userId: number, isPending: boolean) {
        const user = await this.userService.findUserId(userId);
        const friends = await this.userRepository.find({
            relations: {
                friends: true,
            },
            where: [
                { friends: { user: { id: userId }, isPending: isPending } },
                { friends: { friend: { id: userId }, isPending: isPending } },
            ],
            select: {
                id: true,
                username: true,
                avatar: true,
            },
        });
        return friends;
    }

    async deleteFriend(friendDto: FriendDTO): Promise<string> {
        const res = await this.friendRepository.delete({ id: friendDto.id });
        console.log(res);
        return "friend deleted";
    }
}
