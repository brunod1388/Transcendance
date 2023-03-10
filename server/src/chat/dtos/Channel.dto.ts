import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { ChannelType } from "../entities/Channel.entity";
import { BlockedUser, ChannelUser, Message, MutedUser } from "../entities";
import { User } from "src/users/entities/User.entity";

export class CreateChannelDto {
    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: ChannelType;

    @ValidateIf((o) => o.type === "protected")
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

    @ValidateIf((o) => o.type === "protected")
    @IsNotEmpty()
    password: string;
}

export interface ChannelDto {
    id: number;
    name: string;
    type?: ChannelType;
    owner?: User;
    messages?: Message[];
    channelUsers?: ChannelUser[];
    blockedUsers?: BlockedUser[];
    mutedUsers?: MutedUser[];
    creationDate?: Date;
    password?: string;
}
