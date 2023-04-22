import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { GeneralGateway } from "./general.gateway";
import { GeneralService } from "./general.service";
import { UsersModule } from "src/users/users.module";
import { ChannelModule } from "src/chat/channel/channel.module";
import { ChannelUsersModule } from "src/chat/channelUser/channelUsers.module";
import { FriendModule } from "src/users/friend/friend.module";

@Module({
    imports: [AuthModule, forwardRef(() => UsersModule), forwardRef(() => ChannelModule), forwardRef(() => ChannelUsersModule), forwardRef(() => FriendModule)],
    controllers: [],
    providers: [GeneralGateway, GeneralService],
    exports: [GeneralGateway, GeneralService],
})
export class GeneralModule {}
