import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Friend } from "../entities/Friend.entity";
import { FriendService } from "./friend.service";

@Module({
    imports: [TypeOrmModule.forFeature([Friend])],
    providers: [FriendService],
    exports: [FriendService],
})
export class FriendModule {}
