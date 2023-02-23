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
        private channelRepository: Repository<Channel>
    ) {}

    createChannel(channelDetails: CreateChannelDto) {
        const newChannel = this.channelRepository.create({
            ...channelDetails,
        });
        // newChannel.owner = channelDetails.ownerId;
        console.log(newChannel);
        // console.log(this.users.findUserId(channelDetails.ownerId))
        return this.channelRepository.save(newChannel);
    }
}
