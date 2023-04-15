import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/User.entity";
import { UsersModule } from "src/users/users.module";
import { ChannelModule } from "../channel/channel.module";
import { Channel } from "../entities";
import { BlockedUser } from "../entities/BlockedUser.entity";
import { BlockedUserService } from "./blockedUser.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([BlockedUser, User, Channel]),
        UsersModule,
        forwardRef(() => ChannelModule),
    ],
    providers: [BlockedUserService],
    exports: [BlockedUserService],
})
export class BlockedUserModule {}
