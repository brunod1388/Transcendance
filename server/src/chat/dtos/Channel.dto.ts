import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
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

    @ValidateIf(o => o.type === 'protected')
    @IsNotEmpty()
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

    @ValidateIf(o => o.type === 'protected')
    @IsNotEmpty()
    password: string;
}
