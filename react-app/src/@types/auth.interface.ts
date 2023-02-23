import { User } from "./user.interface";

export interface AuthType {
    user: User;
    jwt_token: string;
}
