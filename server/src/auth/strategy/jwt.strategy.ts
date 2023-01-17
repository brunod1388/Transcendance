import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
//import { PrismaService } from "../../prisma/prisma.service";
import { UsersService } from "../../users/services/users/users.service";
import { User } from "../../typeorm/entities/User";

// This class has a specific use case which is the validation of the access token
// This is why it is seperated into its own folder
// The strategy will be identified by the AuthGuard based on the keyword 'jwt' (which is the default), this keyword can be changed
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService, private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET"),
        });
    }

    // The token will be transformed into an object and passed into payload
    async validate(payload: { sub: number; email: string }) {
        const user = await this.usersService.findUserId(payload.sub);
        // the hashed password is deleted to ensure we don't inadvertently export sensitive info
        delete user.password;
        // By returning the user, it will append the user to the user object of the request object
        // If the user is not found (null returned) a 401 error will be returned
        return user;
    }
}
