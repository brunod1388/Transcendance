import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
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
import { Create42UserDto } from "../users/dtos/Create42User.dto";

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

    //    callback(@GetUser() user: User, @Res({passthrough: true}) res) {
    @UseGuards(FortyTwoGuard)
    @Get("login42/callback")
    async callback(@Request() req, @Res() res: Response) {
        const dto: Create42UserDto = {
            idFortyTwo: req.user.id,
            username: req.user.login,
            email: req.user.email,
            enable2FA: false,
            code2FA: "",
        };
        //    const token = this.authService.signToken(user.id, user.username, user.email);
        const token = await this.authService.login42(dto);

        console.log("ACCESS TOKEN:", token["access_token"]);
        console.log("ID FORTY TWO:", req.user.id);
        console.log("USERNAME:", req.user.login);
        console.log("EMAIL:", req.user.email);

        const url = new URL(`${req.protocol}:${req.hostname}`);
        url.port = "3000";
        url.pathname = "login42";
        url.searchParams.set("code", token["access_token"]);
        res.status(302).redirect(url.href);
        //    res.cookie('jwt_token', token);
        //    return res.redirect('http://localhost:3000/users/me');
    }
}
