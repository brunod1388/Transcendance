import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
//import { Strategy } from "passport-oauth2";
//import { Strategy } from "passport-oauth2";
import { UsersService } from "../../../users/users.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, "42") {
    constructor(
        private config: ConfigService,
        private usersService: UsersService
    ) {
        super({
            clientID: config.get("FT_APP_UID"),
            clientSecret: config.get("FT_APP_SECRET"),
            callbackURL:
                process.env.REACT_APP_BACKEND_URL + "/auth/login42/callback",
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
    }

    async validate(accessToken, refreshToken, profile, cb): Promise<any> {
        let user = await this.usersService.findUserIdFortyTwo(profile.id);
        if (user === null || user === undefined) {
            user = await this.usersService.create42User({
                idFortyTwo: profile.id,
                username: profile.login,
                email: profile.email,
                authStrategy: "42",
                avatar: profile.photo,
            });
        }
        delete user.password;
        delete user.code2FA;
        return user;
    }
}
