import { IsNotEmpty, IsString } from "class-validator";

export class GameEndDTO {
    @IsString()
    @IsNotEmpty()
    room: string;

    score: [number, number];
}
