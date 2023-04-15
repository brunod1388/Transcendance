import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/User.entity";
import { UsersModule } from "src/users/users.module";
import { ChannelModule } from "../channel/channel.module";
import { Channel } from "../entities";
import { MutedUser } from "../entities/MutedUser.entity";
import { MutedUserService } from "./mutedUser.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MutedUser, User, Channel]),
        UsersModule,
        forwardRef(() => ChannelModule),
    ],
    providers: [MutedUserService],
    exports: [MutedUserService],
})
export class MutedUserModule {}
