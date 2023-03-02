import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Channel } from "../entities/Channel.entity";
import { ChannelService } from "./channel.service";
import { UsersModule } from "src/users/users.module";
import { ChannelUserModule } from "../channel-user/channel-user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Channel]),
        UsersModule,
        // forwardRef(() => ChannelUserModule),
    ],
    providers: [ChannelService],
    exports: [ChannelService],
})
export class ChannelModule {}
