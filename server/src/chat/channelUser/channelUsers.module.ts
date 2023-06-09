import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelUser } from "../entities/ChannelUser.entity";
import { ChannelUserService } from "./channelUsers.service";
import { UsersModule } from "src/users/users.module";
import { ChannelModule } from "../channel/channel.module";
import { GeneralModule } from "src/general/general.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChannelUser]),
        UsersModule,
        forwardRef(() => ChannelModule),
        forwardRef(() => GeneralModule),
    ],
    providers: [ChannelUserService],
    exports: [ChannelUserService],
})
export class ChannelUsersModule {}
