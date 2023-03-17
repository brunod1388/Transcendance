import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateChannelDto, UpdateChannelDto } from "../dtos/Channel.dto";
import { UsersService } from "../../users/users.service";
import { ChannelUserService } from "../channelUser/channelUsers.service";
import { Channel, ChannelType, ChannelUser, rightType } from "../entities";
import { User } from "src/users/entities/User.entity";

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private channelRepository: Repository<Channel>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UsersService,
        private channelUserService: ChannelUserService
    ) {}

    findChannelById(id: number) {
        return this.channelRepository.findOne({
            where: { id: id },
            select: {
                id: true,
                name: true,
                image: true,
            },
        });
    }

    async createChannel(channelDetails: CreateChannelDto): Promise<Channel> {
        const owner: User = await this.userService.findUserId(
            channelDetails.ownerId
        );
        return await this.channelRepository.save({
            ...channelDetails,
            owner: owner,
        });
    }

    async getChannels(userId: number, isPending: boolean): Promise<Channel[]> {
        const channels = await this.channelRepository.find({
            relations: {
                channelUsers: true,
            },
            where: {
                channelUsers: { user: {
                    id: userId},
                    isPending: isPending
                },
            },
            select: {
                id: true,
                name: true,
                image: true,
            },
        });
        return channels;
    }

    async getPrivateUsers(userId: number): Promise<User[]> {
        const users = this.userRepository.find({
            relations: {
                channelUsers: { channel: true },
            },
            where: {
                channelUsers: {
                    channel: { type: ChannelType.DIRECT },
                },
            },
            select: {
                id: true,
                username: true,
            },
        });
        return users;
    }
}
