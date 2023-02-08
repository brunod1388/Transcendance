import { IsNumber, IsNotEmpty } from "class-validator";

export class UpdatePlayerDTO {
    @IsNumber()
    @IsNotEmpty()
    x: number;

    @IsNumber()
    @IsNotEmpty()
    y: number;
}
