import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/users/entities/User.entity";
import { Channel } from "../entities";

export class CreateBlockedUserDTO {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    endDate: string;
}

// Is this necessary??
export class UpdateBlockedUserDTO {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    endDate: string;
}
