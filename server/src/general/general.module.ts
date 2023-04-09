import { Module, forwardRef} from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ClientsModule } from "src/clients/clients.module";
import { ClientsService } from "src/clients/clients.service";
import { GeneralGateway } from "./general.gateway";
import { GeneralService } from "./general.service";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [ClientsModule, AuthModule, forwardRef(() => UsersModule)],
    controllers: [],
    providers: [GeneralGateway, GeneralService],
    exports: [GeneralGateway],
})
export class GeneralModule {}
