import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Friend } from "../entities/Friend.entity";
import { FriendService } from "./friend.service";
import { UsersModule } from "../users.module";
import { User } from "../entities/User.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Friend, User]),
        forwardRef(() => UsersModule),
    ],
    providers: [FriendService],
    exports: [FriendService],
})
export class FriendModule {}
