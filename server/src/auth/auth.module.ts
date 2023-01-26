import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";
import { UsersModule } from "../users/users.module";
import { FtStrategy } from "./42strategy/ft.strategy";

// UsersModule added -- debugging JAN17
// The class must be exported to allow other modules to access it
@Module({
    imports: [UsersModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, FtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
