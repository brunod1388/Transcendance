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

    // find is an async function, must await when calling getMutedUsers function
    getMutedUsers(channelId: number) {
        return this.MutedUserRepo.find({
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

    // findOne is an async function, must await when calling findMutedUserByID function
    findMutedUserByID(MutedUserID: number) {
        return this.MutedUserRepo.findOne({
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
    }

    // find is an async function, must await when calling getMutedUsersByUserID function
    getMutedUsersByUserID(userID: number) {
        return this.MutedUserRepo.find({
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

    // findOne is an async function, must await when calling checkIfMuted function
    checkIfMuted(userID: number, channelID: number) {
        return this.MutedUserRepo.findOne({
            where: {
                userID: userID,
                channelID: channelID,
            },
            select: {
                id: true,
                endDate: true,
            },
        });
    }

    async deleteMutedUser(id: number): Promise<string> {
        await this.MutedUserRepo.delete({ id });
        return `mutedUser ${id} deleted`;
    }
}
