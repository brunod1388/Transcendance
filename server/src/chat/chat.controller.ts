import { Controller, Get } from "@nestjs/common";

@Controller("chat")
export class ChatController {
    @Get()
    getAll(): string {
        return "hello World";
    }
}
