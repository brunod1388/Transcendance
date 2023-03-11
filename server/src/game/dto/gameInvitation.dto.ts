import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GameInvitationDto {
    @IsNumber()
    from: number;

    @IsString()
    @IsNotEmpty()
    to: string;
}
