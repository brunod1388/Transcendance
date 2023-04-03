import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    Injectable,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/User.entity";
import { AuthDto } from "./dto";
import {
    CreateUserDto,
    UpdateUserDto,
    Create42UserDto,
    UpdateUserPasswordDto,
} from "../users/dtos/UserValidation.dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as speakeasy from "speakeasy";
import * as QRCode from "qrcode";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: CreateUserDto) {
        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException(
                "Password does not match confirm password"
            );
        }

        console.log("REMINDER: Uncomment password strength rules");
        // password strength rules: min. 8 characters long (64 characters max),
        //  contains at least one digit, one uppercase and one lowercase letter,
        //  one special character

        //const pwdRules = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/);

        // if (!pwdRules.test(dto.password)) {
        //     throw new BadRequestException(
        //         "Password: min. 8 characters long, contains at least one digit, one uppercase and one lowercase letter, one special character"
        //     );
        // }

        // generate the password hash using argon
        // await is required as argon.hash is an asynchornous function
        //  const hash = await argon.hash(dto.password);
        dto.password = await argon.hash(dto.password);

        // filtering out the confirmPassword field and spreading the rest into userDetails
        const { confirmPassword, ...userDetails } = dto;

        // save the new user in the db
        // using a try/catch in order to provide a more specific error description
        let user: User;
        try {
            user = await this.usersService.createUser(userDetails);
        } catch (error) {
            throw new ForbiddenException("Credentials taken");
        }
    }

    async enable2FA(id: number) {
        const user = await this.usersService.findUserId(id);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                "The specified id does not match an existing user"
            );
        }
        const secret = this.generate2FAsecret();
        const dto: UpdateUserDto = {
            enable2FA: true,
            code2FA: secret.base32,
        };
        const updated = await this.usersService.updateUser(user.id, dto);
        const dataURL = await QRCode.toDataURL(secret.otpauthUrl);

        return { url: dataURL };
    }

    async deactivate2FA(id: number) {
        const user = await this.usersService.findUserId(id);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                "The specified id does not match an existing user"
            );
        }
        const dto: UpdateUserDto = {
            enable2FA: false,
        };
        const updated = await this.usersService.updateUser(user.id, dto);
        console.log("Updated user: ", updated);
    }

    async activate2FA(id: number) {
        const user = await this.usersService.findUserId(id);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                "The specified id does not match an existing user"
            );
        }
        const dto: UpdateUserDto = {
            enable2FA: true,
        };
        const updated = await this.usersService.updateUser(user.id, dto);
        console.log("Updated user: ", updated);
        return this.signToken(user.id, user.username, true);
    }

    async login42(dto: Create42UserDto) {
        let user = await this.usersService.findUserIdFortyTwo(dto.idFortyTwo);
        if (user === undefined || user === null) {
            user = await this.usersService.create42User(dto);
        }

        if (user.enable2FA) {
            return this.sign2faToken(user.id, user.username);
        } else {
            return this.signToken(user.id, user.username, false);
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.usersService.findUser(dto.username);
        if (user && user.authStrategy === "42") {
            throw new ForbiddenException(
                "Password authentication not possible - user with 42 authStrategy"
            );
        }

        // if user does not exist, throw exception (guard condition)
        if (!user) throw new ForbiddenException("Credentials incorrect");

        // compare password (user.password is hashed; dto.password is plain text)
        const pwMatches = await argon.verify(user.password, dto.password);

        // if password incorrent, throw exception
        if (!pwMatches) throw new ForbiddenException("Credentials incorrect");

        let token;
        if (user.enable2FA) {
            token = await this.sign2faToken(user.id, user.username);
        } else {
            token = await this.signToken(user.id, user.username, false);
        }

        return {
            access_token: token,
            user: user,
        };
    }

    // the signToken function will take the fields that need to be signed
    // these fields will then be extracted from the jwt and used to perform validation
    // Promise<{access_token: string}> a function description, ensures that an object of type string is returned
    async sign2faToken(
        userId: number,
        username: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            username,
        };
        const secret = this.config.get("JWT_SECRET");

        // Once the token is provided to the user, the user will be able to perform actions on the platform for 60min
        // After this time has expired, the token will be rejected and the sign in process will have to be restarted
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret,
        });

        return {
            access_token: token,
        };
    }

    async signToken(
        userId: number,
        username: string,
        tfaValid: boolean
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            username,
            tfaValid,
        };
        const secret = this.config.get("JWT_SECRET");

        // Once the token is provided to the user, the user will be able to perform actions on the platform for 60min
        // After this time has expired, the token will be rejected and the sign in process will have to be restarted
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "60m",
            secret: secret,
        });

        return {
            access_token: token,
        };
    }

    generate2FAsecret() {
        const secret = speakeasy.generateSecret({
            name: this.config.get("APP_NAME_2FA"),
        });
        return {
            otpauthUrl: secret.otpauth_url,
            base32: secret.base32,
        };
    }

    // totp : time-based one-time password
    async verify2FAcode(code2FA: string, id: number) {
        const user = await this.usersService.findUserId(id);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                "The specified id does not match an existing user"
            );
        }
        return speakeasy.totp.verify({
            secret: user.code2FA,
            encoding: "base32",
            token: code2FA,
        });
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.usersService.findUserId(id);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                "The specified id does not match an existing user"
            );
        }
        const updated = await this.usersService.updateUser(user.id, dto);
        console.log("Updated user: ", updated);
        const updatedUser = await this.usersService.findUserId(id);
        if (updatedUser.enable2FA) {
            return this.signToken(updatedUser.id, updatedUser.username, true);
        } else {
            return this.signToken(updatedUser.id, updatedUser.username, false);
        }
    }

    async updateUserPassword(id: number, dto: UpdateUserPasswordDto) {
        const user = await this.usersService.findUserId(id);
        if (user === null || user === undefined) {
            throw new NotFoundException(
                "The specified id does not match an existing user"
            );
        }

        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches) throw new ForbiddenException("Credentials incorrect");

        if (dto.newPassword !== dto.confirmNewPassword) {
            throw new BadRequestException(
                "Password does not match confirm password"
            );
        }

        const pwdRules = new RegExp(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/
        );

        if (!pwdRules.test(dto.newPassword)) {
            throw new BadRequestException(
                "Password: min. 8 characters long, contains at least one digit, one uppercase and one lowercase letter, one special character"
            );
        }

        dto.newPassword = await argon.hash(dto.newPassword);

        const updated = await this.usersService.updateUser(user.id, {
            password: dto.newPassword,
        });
        console.log("Updated user: ", updated);
    }

    async generateQRcode(path: string, response: Response) {
        return QRCode.toFileStream(response, path);
    }
}
