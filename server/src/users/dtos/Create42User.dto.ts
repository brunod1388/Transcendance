import { IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class Create42UserDto {
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
