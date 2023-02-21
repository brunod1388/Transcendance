export interface User {
    id: number;
    username: string;
    authStrategy: "42" | "password" | null;
    enable2FA: boolean;
}
