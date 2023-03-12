import { IsNotEmpty, IsNumber } from "class-validator";
import { rightType } from "../entities/ChannelUser.entity";
import { User } from "src/users/entities/User.entity";
import { Channel } from "../entities";
export class CreateChannelUserDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNotEmpty()
    rights: rightType;

    @IsNotEmpty()
    isPending: boolean;
}

export class UpdateChannelUserDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNotEmpty()
    rights: rightType;

    @IsNotEmpty()
    isPending: boolean;
}

export interface ChannelUserDTO {
    id: number;
    user?: User;
    channel?: Channel;
    rights?: rightType;
    isPending?: boolean;
}
