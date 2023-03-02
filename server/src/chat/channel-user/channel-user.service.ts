import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ChannelUser } from "../entities/ChannelUser.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelService } from "../channel/channel.service";

@Injectable()
export class ChannelUserService {
    constructor(
        @InjectRepository(ChannelUser)
        private channelRepository: Repository<ChannelUser>
    ) {}
    // @InjectRepository(ChannelUser)
    // private ChannelUserRepository: Repository<ChannelUser>
    //     @Inject(forwardRef(() => ChannelService))
    //     private ChannelService: ChannelService
    createChannelUser(userId: number, channelId: number) {
        console.log("");
    }
}
