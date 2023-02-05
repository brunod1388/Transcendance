import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsBoolean,
} from "class-validator";

export class Create42UserDto {
    @IsNumber()
    @IsNotEmpty()
    idFortyTwo: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsBoolean()
    enable2FA: boolean;

    @IsString()
    code2FA: string;
}
