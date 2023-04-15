import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BlockedUser } from "../entities/BlockedUser.entity";
import { CreateBlockedUserDTO } from "../dtos/BlockedUser.dto";
import { UsersService } from "src/users/users.service";
import { ChannelService } from "../channel/channel.service";

@Injectable()
export class BlockedUserService {
    constructor(
        @InjectRepository(BlockedUser)
        private blockedUserRepo: Repository<BlockedUser>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => ChannelService))
        private channelService: ChannelService
    ) {}

    async createBlockedUser(
        blockedUserDetails: CreateBlockedUserDTO
    ): Promise<BlockedUser> {
        const user = await this.userService.findUserId(
            blockedUserDetails.userId
        );
        const channel = await this.channelService.findChannelById(
            blockedUserDetails.channelId
        );
        const newBlockedUser = await this.blockedUserRepo.create({
            userID: user.id,
            channelID: channel.id,
            user: user,
            channel: channel,
            endDate: new Date(blockedUserDetails.endDate),
        });
        try {
            const blockedUser = await this.blockedUserRepo.save(newBlockedUser);
            return blockedUser;
        } catch (err) {
            return undefined;
        }
    }

    // find is an async function, must await when calling getBlockedUsers function
    getBlockedUsers(channelId: number) {
        return this.blockedUserRepo.find({
            where: {
                channelID: channelId,
            },
            select: {
                id: true,
                userID: true,
                channelID: true,
                endDate: true,
            },
        });
    }

    // findOne is an async function, must await when calling findBlockedUserByID function
    findBlockedUserByID(blockedUserID: number) {
        return this.blockedUserRepo.findOne({
            where: {
                id: blockedUserID,
            },
            select: {
                id: true,
                userID: true,
                channelID: true,
                endDate: true,
            },
        });
    }

    // find is an async function, must await when calling getBlockedUsersByUserID function
    getBlockedUsersByUserID(userID: number) {
        return this.blockedUserRepo.find({
            where: {
                userID: userID,
            },
            select: {
                id: true,
                userID: true,
                channelID: true,
                endDate: true,
            },
        });
    }

    async deleteBlockedUser(id: number): Promise<string> {
        await this.blockedUserRepo.delete({ id });
        return `blockedUser ${id} deleted`;
    }
}
