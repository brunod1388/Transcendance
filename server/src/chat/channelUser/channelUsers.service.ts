import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ChannelUser, rightType } from "../entities/ChannelUser.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelService } from "../channel/channel.service";
import { ChannelUserDTO, CreateChannelUserDto } from "../dtos/ChannelUsers.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/User.entity";
import { Channel } from "diagnostics_channel";

@Injectable()
export class ChannelUserService {
    constructor(
        @InjectRepository(ChannelUser)
        private channelUserRepository: Repository<ChannelUser>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => ChannelService))
        private channelService: ChannelService
    ) {}

    async createChannelUser(channelUserDetails: CreateChannelUserDto) {
        const user = await this.userService.findUserId(
            channelUserDetails.userId
        );
        const channel = await this.channelService.findChannelById(
            channelUserDetails.channelId
        );
        const newChannelUser = await this.channelUserRepository.create({
            ...channelUserDetails,
            user: user,
            channel: channel,
        });
        return await this.channelUserRepository.save(newChannelUser);
    }

    async getChannelUsers(
        userId: number,
        isPending: boolean
    ): Promise<ChannelUserDTO[]> {
        const channelUsers = await this.channelUserRepository.find({
            relations: {
                user: true,
                channel: true,
            },
            where: {
                isPending: isPending,
                user: { id: userId },
            },
            select: {
                id: true,
                user: { id: true, username: true, avatar: true },
                channel: { id: true, name: true, image: true },
            },
        });
        return channelUsers;
    }

    async updateChannelUser(
        channelUserDetails: ChannelUserDTO
    ): Promise<string> {
        const {
            id,
            isPending = false,
            rights = rightType.NORMAL,
        } = channelUserDetails;
        const channelUser = await this.channelUserRepository.findOne({
            where: {
                id: id,
            },
        });
        if (channelUser === undefined) return "ChannelUser does not exist";
        channelUser.isPending = isPending;
        channelUser.rights = rights;
        console.log
        await this.channelUserRepository.save(channelUser);
        return "ChannelUser updated";
    }
}
