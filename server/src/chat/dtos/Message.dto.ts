import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    channelId: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class UpdateMessageDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class GetMessageDto {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    nb: number;
    
}
