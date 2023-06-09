import {
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateIf,
    IsOptional,
} from "class-validator";
import { ChannelType } from "../entities/Channel.entity";
import { ChannelUser, Message } from "../entities";
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
    @IsOptional()
    ownerId?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsNotEmpty()
    @IsOptional()
    type?: ChannelType;

    @ValidateIf((o) => o.type === "protected")
    @IsNotEmpty()
    oldPassword: string;

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
    creationDate?: Date;
    password?: string;
}
