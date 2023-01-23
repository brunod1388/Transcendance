import { ForbiddenException, Injectable } from "@nestjs/common";
//import { User, Bookmark } from "@prisma/client";
//import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { User } from "../typeorm/entities/User";
import { AuthDto } from "./dto";
import { CreateUserDto } from "../users/dtos/CreateUser.dto";
import * as argon from "argon2";
//import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as speakeasy from "speakeasy";
import * as QRCode from "qrcode";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        //      private prisma: PrismaService,
        private usersService: UsersService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: CreateUserDto, response: Response) {
        // generate the password hash using argon
        // await is required as argon.hash is an asynchornous function
        //  const hash = await argon.hash(dto.password);
        dto.password = await argon.hash(dto.password);
        // filtering out the confirmPassword field and spreading the rest into userDetails
        const { confirmPassword, ...userDetails } = dto;
        // save the new user in the db
        if (userDetails.enable2FA) {
            const secret = this.generate2FAsecret();
            userDetails.code2FA = secret.base32;
            const user = await this.usersService.createUser(userDetails);
            return this.generateQRcode(secret.otpauthUrl, response);
        }
        const user = await this.usersService.createUser(userDetails);
        return this.signToken(user.id, user.username, user.email);

        // using a try/catch in order to provide a more specific error description
        /*    try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // P2002 is the error code for duplicate field which violates a unique constraint
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw error;
        }
    */
    }

    async signin(dto: AuthDto) {
        // find the user by email
        /*      const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
    */
        const user = await this.usersService.findUser(dto.username);
        let valid2FA = false;
        if (user.enable2FA && user.code2FA != "") {
            valid2FA = this.verify2FAcode(dto.code2FA, user)
            console.log("VALID: ", valid2FA);
        }
        // if user does not exist, throw exception (guard condition)
        if (!user) throw new ForbiddenException("Credentials incorrect");
        // compare password (user.password is hashed; dto.password is plain text)
        const pwMatches = await argon.verify(user.password, dto.password);
        // if password incorrent, throw exception
        if (!pwMatches || (user.enable2FA && !valid2FA)) throw new ForbiddenException("Credentials incorrect");
        return this.signToken(user.id, user.username, user.email);
    }
    // the signToken function will take the fields that need to be signed
    // these fields will then be extracted from the jwt and used to perform validation
    // Promise<{access_token: string}> a function description, ensures that an object of type string is returned
    async signToken(
        userId: number,
        username: string,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            username,
            email,
        };
        const secret = this.config.get("JWT_SECRET");

        // Once the token is provided to the user, the user will be able to perform actions on the platform for 15min
        // After this time has expired, the token will be rejected and the sign in process will have to be restarted
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
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
    verify2FAcode(code2FA: string, user: User) {
        return speakeasy.totp.verify({
            secret: user.code2FA,
            encoding: "base32",
            token: code2FA,
        });
    }

    async generateQRcode(path: string, response: Response) {
        return QRCode.toFileStream(response, path);
    }
}
