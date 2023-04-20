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
    UpdateUserDto,
    UpdateUserPasswordDto,
} from "../users/dtos/UserValidation.dto";
import { FortyTwoGuard } from "./guard/FortyTwo.guard";
import { GetUser } from "./decorator";
import { User } from "../users/entities/User.entity";
import { JwtGuard, tfaGuard } from "./guard";

// In order to call the functions of the AuthService class, the AuthController will
// have to instantiate a AuthService class. To avoid explicit
// instantiation [const service = new AuthService()], and having to manage where it's
// created, dependancy injection is used [private authService: AuthService]
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    //    @HttpCode(HttpStatus.OK)
    @Post("signup")
    signup(
        @Request() req,
        @Body() dto: CreateUserDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.signup(dto);
    }

    // return status code 200 (OK) on signin as no new resource is created
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    async signin(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const ret = await this.authService.signin(dto);

            res.cookie("JWTtoken", ret["access_token"]["access_token"], {
                sameSite: "none",
                secure: true,
            });

            if (ret["user"]["enable2FA"]) {
                return { redirect: "/verify2fa" };
            }
            return { redirect: "/home" };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @UseGuards(JwtGuard)
    @Get("enable2FA")
    async enable2FA(@Request() req) {
        const dataURL = this.authService.enable2FA(req.user.id);
        await this.authService.deactivate2FA(req.user.id);
        return dataURL;
    }

    @UseGuards(JwtGuard)
    @Post("deactivate2FA")
    async deactivate2FA(
        @Request() req,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            await this.authService.deactivate2FA(req.user.id);
            const ret = await this.authService.signToken(
                req.user.id,
                req.user.username,
                false
            );
            res.clearCookie("JWTtoken", { sameSite: "none", secure: true });
            res.cookie("JWTtoken", ret["access_token"], {
                sameSite: "none",
                secure: true,
            });
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtGuard)
    @Post("activate2FA")
    async activate2FA(
        @Request() req,
        @Body() dto: TFverifyDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const isVerified = await this.authService.verify2FAcode(
            dto.code,
            req.user.id
        );
        if (!isVerified) {
            throw new ForbiddenException("Verifictation code incorrect");
        }
        try {
            const ret = await this.authService.activate2FA(req.user.id);
            res.clearCookie("JWTtoken", { sameSite: "none", secure: true });
            res.cookie("JWTtoken", ret["access_token"], {
                sameSite: "none",
                secure: true,
            });
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(tfaGuard)
    @Post("verify2FA")
    async verify2FA(
        @Request() req,
        @Body() dto: TFverifyDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const isVerified = await this.authService.verify2FAcode(
            dto.code,
            req.user.id
        );
        if (!isVerified) {
            throw new ForbiddenException("Verification code incorrect");
        }
        const token = await this.authService.signToken(
            req.user.id,
            req.user.username,
            isVerified
        );
        res.cookie("JWTtoken", token["access_token"], {
            sameSite: "none",
            secure: true,
        });
    }

    @UseGuards(JwtGuard)
    @Post("update")
    async updateUser(
        @Request() req,
        @Body() dto: UpdateUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const ret = await this.authService.updateUser(req.user.id, dto);
            res.clearCookie("JWTtoken", { sameSite: "none", secure: true });
            res.cookie("JWTtoken", ret["access_token"], {
                sameSite: "none",
                secure: true,
            });
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtGuard)
    @Post("updatePassword")
    updateUserPassword(@Request() req, @Body() dto: UpdateUserPasswordDto) {
        return this.authService.updateUserPassword(req.user.id, dto);
    }

    @UseGuards(FortyTwoGuard)
    @Get("login42")
    async login42(@GetUser() user: User) {
        return user;
    }

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

        if (req.user.enable2FA) {
            //return res.redirect("http://localhost:9000/verify2fa");
            return res.redirect(
                process.env.REACT_APP_FRONTEND_URL + "/verify2fa"
            );
        }
        //return res.redirect("http://localhost:9000/home");
        return res.redirect(process.env.REACT_APP_FRONTEND_URL + "/home");
    }
}
