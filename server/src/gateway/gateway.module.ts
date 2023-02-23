import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WSGateway } from "./gateway";

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [WSGateway],
    exports: [],
})
export class GatewayModule {}
