import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "../users/dtos/CreateUser.dto";

// In order to call the functions of the AuthService class, the AuthController will
// have to instantiate a AuthService class. To avoid explicit
// instantiation [const service = new AuthService()], and having to manage where it's
// created, dependancy injection is used [private authService: AuthService]
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup(@Body() dto: CreateUserDto) {
        //the validated dto (data transfer object) is passed to the auth.Service
        return this.authService.signup(dto);
    }

    // return status code 200 (OK) on signin as no new resource is created
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}
