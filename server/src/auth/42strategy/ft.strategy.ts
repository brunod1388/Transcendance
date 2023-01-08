import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
    constructor(config: ConfigService) {
        super({
            clientID: config.get('FT_APP_ID'),
            clientSecret: config.get('FT_APP_SECRET'),
            callbackURL: "http://127.0.0.1:3000/auth/42/callback",
        });
    }

    // Not sure how the validation is to be performed, similarly to jwt.strategy???
//    validate(accessToken, refreshToken, profile, cb) {}
}