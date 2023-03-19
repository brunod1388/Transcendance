import { Module } from "@nestjs/common";
import { ClientsModule } from "src/clients/clients.module";
import { ClientsService } from "src/clients/clients.service";
import { GeneralGateway } from "./general.gateway";
import { GeneralService } from "./general.service";

@Module({
    imports: [ClientsModule],
    controllers: [],
    providers: [GeneralGateway, GeneralService],
    exports: [GeneralGateway],
})
export class GeneralModule {}
