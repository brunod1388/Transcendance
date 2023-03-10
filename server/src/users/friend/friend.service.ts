import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Friend } from "../entities/Friend.entity";
import { UsersService } from "../users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendDto } from "../dtos/Friend.dto";

@Injectable()
export class FriendService {

    constructor(
        @InjectRepository(Friend)
        private friendRepository: Repository<Friend>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) {}

    async createChannelUser(friendDetails: FriendDto): Promise<string> {
        const user = await this.userService.findUserId(
            friendDetails.userId
        );
        const friend = await this.userService.findUserId(
            friendDetails.friendId
        );
		if (friend === undefined || user === undefined)
			return "error";
        const newFriend = await this.friendRepository.create({
            user: user,
            friend: friend,
			isPending: true
        });
		await this.friendRepository.save(newFriend);
        return "friend created";
    }

	async acceptFriendship(friendDetails: FriendDto): Promise<string> {
        const user = await this.userService.findUserId(
            friendDetails.userId
        );
        const friend = await this.userService.findUserId(
            friendDetails.friendId
        );
		if (friend === undefined || user === undefined)
			return "error";
        const friendship = await this.friendRepository.findOne({
            relations: {
				user: true,
			},
			where: {
				user: { id: user.id},
				friend: {id: friend.id}
			}
        });
		friendship.isPending = true;
		await this.friendRepository.save(friendship);
        return "friendship accepted";
    }
	

}
