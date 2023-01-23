import { IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    enable2FA: boolean;

    @IsString()
    code2FA: string;
}
