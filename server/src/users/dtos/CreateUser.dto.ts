import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
}
