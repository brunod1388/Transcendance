import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChannelDto, CreateChannelDto } from "../dtos/Channel.dto";
import { UsersService } from "../../users/users.service";
import { Channel, ChannelType } from "../entities";
import { User } from "src/users/entities/User.entity";

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private channelRepository: Repository<Channel>,
        private userService: UsersService
    ) {}

    async getAllChannels(): Promise<Channel[]> {
        return await this.channelRepository.find();
    }

    async findChannelById(id: number): Promise<Channel> {
        return await this.channelRepository.findOne({
            relations: { owner: true },
            where: { id: id },
            select: {
                id: true,
                name: true,
                image: true,
                owner: { id: true },
            },
        });
    }

    async findChannelByName(searchName: string): Promise<ChannelDto[]> {
        return await this.channelRepository
            .createQueryBuilder("channel")
            .andWhere("channel.name LIKE :searchString", {
                searchString: `%${searchName}%`,
            })
            .andWhere("channel.type <> :privateChannel", {
                privateChannel: ChannelType.PRIVATE,
            })
            .getMany();
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

    async getChannels(
        userId: number,
        isPending: boolean,
        isPrivate: boolean
    ): Promise<Channel[]> {
        const channels = await this.channelRepository.find({
            relations: {
                channelUsers: true,
                owner: true,
            },
            where: {
                channelUsers: {
                    user: { id: userId },
                    isPending: isPending,
                },
            },
            select: {
                id: true,
                name: true,
                image: true,
                type: true,
                owner: { id: true },
            },
        });
        if (isPrivate)
            return channels.filter((channel) => channel.type === "private");
        return channels.filter((channel) => channel.type !== "private");
    }

    async getPrivateChannelsI(userId: number): Promise<Channel[]> {
        const channels = await this.channelRepository.find({
            relations: {
                channelUsers: true,
            },
            where: {
                channelUsers: {
                    user: { id: userId },
                },
                type: ChannelType.PRIVATE,
            },
            select: {
                id: true,
            },
        });
        return channels;
    }

    async getPrivateChannel(
        userId1: number,
        userId2: number
    ): Promise<Channel> {
        const channels = await this.channelRepository.find({
            relations: {
                channelUsers: true,
            },
            where: {
                channelUsers: {
                    user: { id: userId1 },
                },
                type: ChannelType.PRIVATE,
            },
            select: {
                id: true,
                type: true,
                channelUsers: true,
            },
        });
        let channel = undefined;
        channels.filter((chan) => {
            let hasUser2 = false;
            chan.channelUsers.forEach((chanUser) => {
                if (chanUser.id === userId2) hasUser2 = true;
            });
            if (hasUser2) channel = chan;
        });
        return channel;
    }

    async getPrivateChannelUsers(userId: number) {
        return this.channelRepository.find({
            relations: ["channelUsers", "channelUsers.user"],
            where: {
                type: ChannelType.PRIVATE,
                channelUsers: { user: { id: userId } },
            },
            select: {
                id: true,
                channelUsers: true,
            },
        });
    }

    async deleteChannel(channel: Channel): Promise<string> {
        await this.channelRepository.remove(channel);
        return "Ok";
    }
}
