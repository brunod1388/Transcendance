import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    //   @IsEmail()
    //   @IsNotEmpty()
    //   email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    //    @IsString()
    //    code2FA: string;
}

// export class userIdDTO {
//     @IsNumber()
//     @IsNotEmpty()
//     id: number;
// }

export class TFverifyDTO {
    @IsString()
    @IsNotEmpty()
    code: string;
}
