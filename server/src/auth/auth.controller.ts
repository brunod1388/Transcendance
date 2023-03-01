import {
    Body,
    Controller,
    ForbiddenException,
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
import { AuthDto, TFverifyDTO } from "./dto";
import {
    CreateUserDto,
    Create42UserDto,
} from "../users/dtos/UserValidation.dto";
import { FortyTwoGuard } from "./guard/FortyTwo.guard";
import { GetUser } from "./decorator";
import { User } from "../users/entities/User.entity";
import { JwtGuard } from "./guard";

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

            //    if (dto.enable2FA) {
            //        const { confirmPassword, ...userDetails } = dto;
            //        return this.authService.activate2FA(ret["user"], userDetails);
            //    }

            //  the validated dto (data transfer object) is passed to the auth.Service
            //  return this.authService.signup(dto, response);
            return {
                id: ret["user"]["id"],
                username: ret["user"]["username"],
                avatar: ret["user"]["avatar"],
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
    async signin(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) response: Response
    ) {
        try {
            const ret = await this.authService.signin(dto);

            //response.setHeader("Authorization", `Bearer ${ret["access_token"]}`);
            response.cookie("JWTtoken", ret["access_token"]["access_token"], {
                sameSite: "none",
                secure: true,
            });

            //    if (ret.user && ret.user.enable2FA) {
            //        return this.authService.verify2FAcode(dto.code2FA, ret["user"]);
            //    }

            //  the validated dto (data transfer object) is passed to the auth.Service
            //  return this.authService.signup(dto, response);
            return {
                id: ret["user"]["id"],
                username: ret["user"]["username"],
                avatar: ret["user"]["avatar"],
                authStrategy: ret["user"]["authStrategy"],
                enable2FA: ret["user"]["enable2FA"],
            };
        } catch (error) {
            console.log(error);
            throw error;
        }

        //return this.authService.signin(dto);
    }

    @UseGuards(JwtGuard)
    @Get("enable2FA")
    async enable2FA(@Request() req) {
        const dataURL = this.authService.enable2FA(req.user.id);
        await this.authService.disactivate2FA(req.user.id);
        return dataURL;
    }

    @UseGuards(JwtGuard)
    @Post("activate2FA")
    async activate2FA(
        @Request() req, 
        @Body() dto: TFverifyDTO
    ) {
        const isVerified = await this.authService.verify2FAcode(dto.code, req.user.id);
        if (!isVerified) {
            throw new ForbiddenException("Verifictation code incorrect");
        }
        await this.authService.activate2FA(req.user.id);
    }

    @UseGuards(JwtGuard)
    @Post("verify2FA")
    async verify2FA(@Request() req,@Body() dto: TFverifyDTO) {
        return this.authService.verify2FAcode(dto.code, req.user.id);
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
            authStrategy: "42",
            avatar: req.user.avatar,
        };
        //    const token = this.authService.signToken(user.id, user.username, user.email);

        const token = await this.authService.login42(dto);

        console.log("ACCESS TOKEN:", token["access_token"]);
        console.log("ID FORTY TWO:", req.user.id);
        console.log("USERNAME:", req.user.login);
        console.log("EMAIL:", req.user.email);

        res.cookie("JWTtoken", token["access_token"], {
            sameSite: "none",
            secure: true,
        });

        res.setHeader("Access-Control-Allow-Origin", "*");

        /*    const url = new URL(`${req.protocol}:${req.hostname}`);
        url.port = "3000";
        url.pathname = "login42";
        url.searchParams.set("code", token["access_token"]);
    */
        return res.redirect("http://localhost:9000/");
        //    return {
        //        id: req.user.id,
        //        username: req.user.login,
        //        authStrategy: req.user.authStrategy,
        //        enable2FA: req.user.enable2FA,
        //    };
        //res.status(302).redirect(url.href);
        //    res.cookie('jwt_token', token);
        //    return res.redirect('http://localhost:3000/users/me');
    }

    @UseGuards(JwtGuard)
    @Get("logout")
    logout(@Res({ passthrough: true }) res: Response) {
        // Clearing the cookies will ensure that the routes protected by the JWTGuard
        // are no longer authorized and a login will have to be performed so that a new
        // jwt token is generated
        res.clearCookie("JWTtoken");
        //    res.setHeader("Access-Control-Allow-Origin", "*");
        return res.redirect("http://localhost:9000/login");
    }
}
