import { IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    // Implement a password matching validation (TO DO !!!)
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    //@IsString()
    //@IsNotEmpty()
    //authStrategy: string;

    @IsBoolean()
    enable2FA: boolean;

    @IsString()
    code2FA: string;
}

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
