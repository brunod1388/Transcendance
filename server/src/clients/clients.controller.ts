import { Controller, Get, Post, Body } from "@nestjs/common";
import { ClientsService } from "./clients.service";

interface UpdateClientDto {
    id: number;
    socketId: string;
    username: string;
}

@Controller("clients")
export class ClientsController {
    constructor(private clientsService: ClientsService) {}

    @Get()
    async findAll() {
        console.log("invitation received");
    }

    @Post("update")
    async updateClient(@Body() updateClientDto: UpdateClientDto) {
        console.log("updateClient");
    }
}
