import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
// import { User } from "../../users/entities/User.entity";

// This class has a specific use case which is the validation of the access token
// This is why it is seperated into its own folder
// The strategy will be identified by the AuthGuard based on the keyword 'jwt' (which is the default), this keyword can be changed
// JwtStrategy is a provider  and is included as such in the auth.module
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService, private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: config.get("JWT_SECRET"),
        });
    }

    // The token will be transformed into an object and passed into payload
    async validate(payload: {
        sub: number;
        username: string;
        tfaValid: boolean;
    }) {
        const user = await this.usersService.findUserId(payload.sub);
        // the hashed password is deleted to ensure we don't inadvertently export sensitive info
        delete user.password;
        delete user.code2FA;

        // By returning the user, it will append the user to the user object of the request object
        // If the user is not found (null returned) a 401 error will be returned
        if (user && (!user.enable2FA || payload.tfaValid)) {
            return user;
        }
        throw new UnauthorizedException("Unauthorized Credentials");
    }

    private static extractFromCookie(req: Request): string | null {
        if (req.cookies && "JWTtoken" in req.cookies) {
            return req.cookies.JWTtoken;
        }
        return null;
    }
}
