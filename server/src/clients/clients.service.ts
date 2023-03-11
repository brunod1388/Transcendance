import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// informations associated to user
interface Client {
    socketId: string;
    userId: number;
    username: string;
}

@Injectable()
export class ClientsService {
    // variable containing the users online
    private clientsList = new Array<Client>();

    saveClient(userId: number, socketId: string, username: string) {
        this.clientsList[username] = { username, socketId, userId };
    }

    updateClient(username: string, socketId: string, userId: number) {
        this.clientsList[userId] = { username, socketId, userId };
    }

    findByUsername(username: string): Client {
        console.log(this.clientsList[username]);
        return this.clientsList[username];
    }

    removeClient(key: string) {
        this.clientsList = this.clientsList.filter((client) => {
            return client.socketId !== key && client.username !== key;
        });
    }
}
