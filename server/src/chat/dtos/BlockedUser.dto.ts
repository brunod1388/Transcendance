import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";
import { User } from "src/users/entities/User.entity";
import { Channel } from "../entities";

export class CreateBlockedUserDTO {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;
}

export class unblockUserDTO {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    @IsNotEmpty()
    channelUserId: number;
}
