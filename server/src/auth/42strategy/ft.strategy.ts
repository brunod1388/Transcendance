import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
//import { Strategy } from "passport-oauth2";
import { UsersService } from "../../users/users.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, "42") {
    constructor(
        private config: ConfigService,
        //    private authService: AuthService,
        private usersService: UsersService
    ) {
        super({
            clientID: config.get("FT_APP_UID"),
            clientSecret: config.get("FT_APP_SECRET"),
            callbackURL: "http://127.0.0.1:3000/auth/login42/callback",
            profileFields: {
                id: function (obj) {
                    return obj.id;
                },
                login: function (obj) {
                    return obj.login;
                },
                email: function (obj) {
                    return obj.email;
                },
                photo: function (obj) {
                    return obj.image.link;
                },
            },
        });
        //    console.log("FT_APP_ID: ", config.get("FT_APP_UID"));
        //    console.log("FT_APP_SECRET: ", config.get("FT_APP_SECRET"));
    }

    // Not sure how the validation is to be performed, similarly to jwt.strategy???
    /*    async validate(accessToken, refreshToken, profile, cb): Promise<any> {
        console.log("HEEERRREEE!: ", profile.username);
        let user = await this.usersService.findUser(profile.username);
        if (user === null || user === undefined) {
            user = await this.usersService.create42User({
                username: profile.login,
                email: profile.email,
                enable2FA: false,
            });
        }
        //    delete user.password;
        return user;
    }
*/
    async validate(accessToken, refreshToken, profile, cb): Promise<any> {
        //    console.log(profile.login);
        let user = await this.usersService.findUserIdFortyTwo(profile.id);
        if (user === null || user === undefined) {
            user = await this.usersService.create42User({
                idFortyTwo: profile.id,
                username: profile.login,
                email: profile.email,
                enable2FA: false,
                code2FA: "",
            });
        }
        return user;
    }
}
