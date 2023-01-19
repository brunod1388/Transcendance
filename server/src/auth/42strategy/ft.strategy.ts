import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { AuthService } from "../auth.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, "42") {
    constructor(
        config: ConfigService,
        private authService: AuthService,
        private usersService: UsersService
    ) {
        super({
            clientID: config.get("FT_APP_ID"),
            clientSecret: config.get("FT_APP_SECRET"),
            callbackURL: "http://127.0.0.1:3000/auth/42/callback",
        });
    }

    // Not sure how the validation is to be performed, similarly to jwt.strategy???
    async validate(accessToken, refreshToken, profile, cb) {
        const user = await this.usersService.findUserId(profile.id);
        //   if (user === null || user === undefined)
        //    {
        //        user = await this.authService.signup({
        //            username: profile.login,
        //            email: profile.email
        //        });
        //    }
        delete user.password;
        return user;
    }
}
