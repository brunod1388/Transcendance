import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { FriendModule } from './friend/friend.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), FriendModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
