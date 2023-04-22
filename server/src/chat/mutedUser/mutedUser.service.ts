import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MutedUser } from "../entities/MutedUser.entity";
import { CreateMutedUserDTO } from "../dtos/MutedUser.dto";
import { UsersService } from "src/users/users.service";
import { ChannelService } from "../channel/channel.service";

@Injectable()
export class MutedUserService {
    constructor(
        @InjectRepository(MutedUser)
        private MutedUserRepo: Repository<MutedUser>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => ChannelService))
        private channelService: ChannelService
    ) {}

    async createMutedUser(
        MutedUserDetails: CreateMutedUserDTO
    ): Promise<MutedUser | undefined> {
        const user = await this.userService.findUserId(MutedUserDetails.userId);
        const channel = await this.channelService.findChannelById(
            MutedUserDetails.channelId
        );
        const newMutedUser = await this.MutedUserRepo.create({
            userID: user.id,
            channelID: channel.id,
            user: user,
            channel: channel,
            endDate: new Date(MutedUserDetails.endDate),
        });
        try {
            const MutedUser = await this.MutedUserRepo.save(newMutedUser);
            return MutedUser;
        } catch (err) {
            return undefined;
        }
    }

    async getMutedUsers(channelId: number): Promise<MutedUser[] | undefined> {
        const ret = await this.MutedUserRepo.find({
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

    async findMutedUserByID(MutedUserID: number): Promise<MutedUser | undefined> {
        const ret = await this.MutedUserRepo.findOne({
            where: {
                id: MutedUserID,
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

    async getMutedUsersByUserID(userID: number): Promise<MutedUser[] | undefined> {
        const ret = await this.MutedUserRepo.find({
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

    async checkIfMuted(userID: number, channelID: number): Promise<MutedUser | undefined> {
        const ret = await this.MutedUserRepo.findOne({
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

    async deleteMutedUser(id: number): Promise<string> {
        await this.MutedUserRepo.delete({ id });
        return `mutedUser ${id} deleted`;
    }
}
