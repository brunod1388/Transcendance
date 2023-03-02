import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Channel } from "../entities/Channel.entity";
import { CreateChannelDto, UpdateChannelDto } from "../dtos/Channel.dto";
import { UsersService } from "../../users/users.service";

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private channelRepository: Repository<Channel>,
        private userService: UsersService
    ) {}

    findChannelById(id: number) {
        return this.channelRepository.findOne({
            where: { id: id },
        });
    }

    // getChannelsForUserId(userId: number) {
    //     return this.channelRepository.find({
    //         where: { owner: userId}
    //     })
    // }

    async createChannel(channelDetails: CreateChannelDto) {
        const newChannel = this.channelRepository.create({
            ...channelDetails,
        });
        console.log(await this.userService.findUserId(channelDetails.ownerId));
        newChannel.owner = await this.userService.findUserId(
            channelDetails.ownerId
        );
        // newChannel.channelUsers = [];
        // newChannel.ownerId = channelDetails.ownerId;
        // console.log(newChannel.owner);
        // console.log(this.users.findUserId(channelDetails.ownerId))
        return this.channelRepository.save(newChannel);
    }
}
