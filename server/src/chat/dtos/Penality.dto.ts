import { IsNotEmpty, IsNumber } from "class-validator";
import { MuteOrBlock } from "../entities/Penality.entity";

export class CreatePenalityDTO {
    @IsNumber()
    @IsNotEmpty()
    channelUserId: number;

    @IsNotEmpty()
    type: MuteOrBlock;

    @IsNotEmpty()
    endDate: string;
}

export class UpdatePenalityDTO {
    @IsNumber()
    @IsNotEmpty()
    channelUserId: number;

    @IsNotEmpty()
    type: MuteOrBlock;

    @IsNotEmpty()
    endDate: string;
}
