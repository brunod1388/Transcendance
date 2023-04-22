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
    ): Promise<BlockedUser | undefined> {
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

    async getBlockedUsers(
        channelId: number
    ): Promise<BlockedUser[] | undefined> {
        const ret = await this.blockedUserRepo.find({
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
        return ret;
    }

    async findBlockedUserByID(
        blockedUserID: number
    ): Promise<BlockedUser | undefined> {
        const ret = await this.blockedUserRepo.findOne({
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
        return ret;
    }

    async getBlockedUsersByUserID(
        userID: number
    ): Promise<BlockedUser[] | undefined> {
        const ret = await this.blockedUserRepo.find({
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
        return ret;
    }

    async checkIfBlocked(
        userID: number,
        channelID: number
    ): Promise<BlockedUser | undefined> {
        const ret = await this.blockedUserRepo.findOne({
            where: {
                userID: userID,
                channelID: channelID,
            },
            select: {
                id: true,
                endDate: true,
            },
        });
        return ret;
    }

    async deleteBlockedUser(id: number) {
        return await this.blockedUserRepo.delete({ id: id });
    }
}
