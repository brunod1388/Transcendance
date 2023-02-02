import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class AppController {
    @Get()
    getAll(): string {
        return "hello World";
    }
}
