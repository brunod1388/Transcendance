import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
type BroadcastData = PositionBall | PositionPaddle;

interface PositionBall {
    x: number;
    y: number;
}

interface PositionPaddle {
    y: number;
}

export class BroadcastDTO {
    @IsString()
    @IsNotEmpty()
    room: string;

    @IsString()
    @IsNotEmpty()
    event: string;

    @IsOptional()
    data: BroadcastData;
}
