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
import { CreateUserDto } from "../users/dtos/UserValidation.dto";
import { FortyTwoGuard } from "./guard/FortyTwo.guard";
import { GetUser } from "./decorator";
import { User } from "../users/entities/User.entity";
import { Create42UserDto } from "../users/dtos/Create42User.dto";

// In order to call the functions of the AuthService class, the AuthController will
// have to instantiate a AuthService class. To avoid explicit
// instantiation [const service = new AuthService()], and having to manage where it's
// created, dependancy injection is used [private authService: AuthService]
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    //    @HttpCode(HttpStatus.OK)
    @Post("signup")
    async signup(
        @Request() req,
        @Body() dto: CreateUserDto,
        @Res({ passthrough: true }) response: Response
    ) {
        //    response.setHeader(
        //        "Access-Control-Allow-Origin",
        //        "http://localhost:9000"
        //    );

        try {
            const ret = await this.authService.signup(dto);

            //response.setHeader("Authorization", `Bearer ${ret["access_token"]}`);
            response.cookie("JWTtoken", ret["access_token"]["access_token"], {
                sameSite: "none",
                secure: true,
            });

            if (dto.enable2FA) {
                const { confirmPassword, ...userDetails } = dto;
                return this.authService.activate2FA(ret["user"], userDetails);
            }

            //  the validated dto (data transfer object) is passed to the auth.Service
            //  return this.authService.signup(dto, response);
            return {
                id: ret["user"]["id"],
                username: ret["user"]["username"],
                authStrategy: ret["user"]["authStrategy"],
                enable2FA: ret["user"]["enable2FA"],
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
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
    async callback(@Request() req, @Res({ passthrough: true }) res: Response) {
        const dto: Create42UserDto = {
            idFortyTwo: req.user.idFortyTwo,
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
