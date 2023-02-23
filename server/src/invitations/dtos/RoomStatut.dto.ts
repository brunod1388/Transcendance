import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class RoomStatutDTO {
    @IsString()
    player1: string;

    @IsString()
    player2: string;

    @IsBoolean()
    ready: boolean;
}
