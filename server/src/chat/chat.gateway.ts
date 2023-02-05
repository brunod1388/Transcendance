import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:9000"],
    },
})
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage("send")
    handleMessage(@MessageBody() message: string): string {
        console.log(message);
        this.server.emit("message", message);
        return "server received message";
    }
}
