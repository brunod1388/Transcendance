import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    channelId: number;
}

export class UpdateMessageDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    channelId: number;
}
