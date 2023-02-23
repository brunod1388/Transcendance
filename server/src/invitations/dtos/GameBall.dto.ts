import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class GameBallDTO {
    @IsString()
    @IsNotEmpty()
    room: string;

    @IsNumber()
    @IsNotEmpty()
    x: number;

    @IsNumber()
    @IsNotEmpty()
    y: number;
}
