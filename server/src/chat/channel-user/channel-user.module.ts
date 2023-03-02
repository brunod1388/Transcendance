import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChannelUser } from "../entities/ChannelUser.entity";
import { ChannelUserService } from "./channel-user.service";
import { UsersModule } from "src/users/users.module";
import { ChannelModule } from "../channel/channel.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChannelUser]),
        UsersModule,
        // forwardRef(() => ChannelModule),
    ],
    providers: [ChannelUserService],
    exports: [ChannelUserService],
})
export class ChannelUserModule {}
