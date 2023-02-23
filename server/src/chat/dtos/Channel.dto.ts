import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ChannelType } from "../entities/Channel.entity";

export class CreateChannelDto {
    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: ChannelType;

    password: string;
}

export class UpdateChannelDto {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: ChannelType;

    password: string;
}
