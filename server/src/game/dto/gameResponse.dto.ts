import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GameResponseDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    to: number;

    @IsString()
    @IsNotEmpty()
    room: string;

    @IsNumber()
    statut: number;
}
