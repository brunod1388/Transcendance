import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InvitationDto {
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
