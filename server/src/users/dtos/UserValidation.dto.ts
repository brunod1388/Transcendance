import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsBoolean,
    IsOptional,
} from "class-validator";

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

    //@IsBoolean()
    //enable2FA: boolean;

    //@IsString()
    //code2FA: string;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    // @IsString()
    // @IsNotEmpty()
    // password?: string;

    @IsBoolean()
    @IsOptional()
    enable2FA?: boolean;

    @IsString()
    @IsOptional()
    code2FA?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    avatar?: string;
}

export class UpdateUserPasswordDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    confirmNewPassword: string;
}

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

    @IsString()
    @IsNotEmpty()
    authStrategy: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;

    //@IsBoolean()
    //enable2FA: boolean;

    //@IsString()
    //code2FA: string;
}

// export class Update42UserDto {
//     @IsString()
//     @IsNotEmpty()
//     username?: string;

//     @IsEmail()
//     @IsNotEmpty()
//     email?: string;

//     @IsBoolean()
//     @IsNotEmpty()
//     enable2FA?: boolean;

//     @IsString()
//     @IsNotEmpty()
//     code2FA?: string;

//     @IsString()
//     @IsNotEmpty()
//     avatar?: string;
// }
