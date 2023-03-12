import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GameInvitationDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    from: number;

    @IsString()
    @IsNotEmpty()
    to: string;

	@IsString()
	@IsNotEmpty()
	room: string;
}