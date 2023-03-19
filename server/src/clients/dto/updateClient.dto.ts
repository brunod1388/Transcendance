import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateClientDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    socketId: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
