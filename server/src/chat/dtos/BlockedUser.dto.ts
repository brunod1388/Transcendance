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

// Is this necessary??
export class UpdateBlockedUserDTO {
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
