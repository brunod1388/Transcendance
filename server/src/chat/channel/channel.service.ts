import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateChannelDto, UpdateChannelDto } from "../dtos/Channel.dto";
import { UsersService } from "../../users/users.service";
import { ChannelUserService } from "../channelUser/channelUsers.service";
import { Channel, ChannelUser, rightType } from "../entities";
import { User } from "src/users/entities/User.entity";

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private channelRepository: Repository<Channel>,
        // private channelUserRepository: Repository<ChannelUser>,
        private userService: UsersService,
        private channelUserService: ChannelUserService
    ) {}

    findChannelById(id: number) {
        return this.channelRepository.findOne({
            where: { id: id },
        });
    }

    async getUserChannels(userId: number): Promise<Channel[]> {
        console.log("===================");
        console.log(userId);
        const channels = await this.channelRepository.find({
            relations: {
                channelUsers: true
            },
            where: {
                channelUsers: { user: { id: userId } },
            },
            select: {
                id: true,
                name: true,
                image: true,
            },
        });
        return channels;
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
}
