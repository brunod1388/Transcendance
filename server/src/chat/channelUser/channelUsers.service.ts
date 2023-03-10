import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ChannelUser } from "../entities/ChannelUser.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelService } from "../channel/channel.service";
import { CreateChannelUserDto } from "../dtos/ChannelUsers.dto";
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

    async getUserChannels(userId: number) {
        const channels = await this.channelUserRepository.find({
            select: {
                channel: {
                    id: true,
                    name: true,
                },
            },
            relations: { user: true, channel: true },
            where: { user: { id: userId } },
        });
        return channels;
    }

    async getChannelUsers(channelId: number) {
        const channels = await this.channelUserRepository.find({
            relations: { channel: true, user: true },
            where: { channel: { id: channelId } },
            select: {
                rights: true,
                user: {
                    id: true,
                    username: true,
                },
            },
        });
    }
}
