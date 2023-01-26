import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Res,
    UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "../users/dtos/CreateUser.dto";
import { FortyTwoGuard } from "./guard/FortyTwo.guard";
import { GetUser } from "./decorator";
import { User } from "../typeorm/entities/User";

// In order to call the functions of the AuthService class, the AuthController will
// have to instantiate a AuthService class. To avoid explicit
// instantiation [const service = new AuthService()], and having to manage where it's
// created, dependancy injection is used [private authService: AuthService]
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup(@Body() dto: CreateUserDto, @Res() response: Response) {
        //the validated dto (data transfer object) is passed to the auth.Service
        return this.authService.signup(dto, response);
    }

    // return status code 200 (OK) on signin as no new resource is created
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

    @UseGuards(FortyTwoGuard)
    @Get("login42")
    async login42(@GetUser() user: User) {
        return user;
    }

    //    @UseGuards(FortyTwoGuard)
    //    @Get("login42/callback")
    //    callback(@GetUser() user: User, @Res({passthrough: true}) res) {
    //        const jwtToken = this.authService.signToken(user.id, user.username, user.email);
    //        console.log(jwtToken);
    //        return res.redirect('/');
    //    }
}
