import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class GameFrameDTO {
    @IsString()
    @IsNotEmpty()
    room: string;

    @IsNumber()
    @IsNotEmpty()
    player: number;

    @IsNumber()
    @IsNotEmpty()
    y: number;
}
