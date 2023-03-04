
import { IsNotEmpty, IsNumber } from "class-validator";
import { rightType } from "../entities/ChannelUser.entity";

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
