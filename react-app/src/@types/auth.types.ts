// type Strategy = "42" | "password" | null;

// export interface AuthUser {
//     id: number;
//     username: string;
//     authStrategy: Strategy;
//     enable2FA: boolean;
// }

// export type Token = string;

// export interface AuthType {
//     user: AuthUser;
//     token: Token;
// }

// export const defaultUser: AuthUser = {
// 	id: -1,
// 	username: "",
// 	authStrategy: "42",
// 	enable2FA: false,
// };

// export const defaultContext = {
// 	user: defaultUser,
// 	token: "",
// };

export type Strategy = "42" | "password";

export interface AuthUser {
    id: number;
    username: string;
    avatar: string;
    authStrategy: Strategy;
    enable2FA: boolean;
}

//export type Token = string;

export interface AuthType {
    userAuth: AuthUser;
    //isAuth: boolean;
}

export interface AuthContextType {
    userAuth: AuthUser;
    //isAuth: boolean;
    updateUser: () => void;
    //switchIsAuth: () => void;
}

export const defaultUser: AuthUser = {
    id: 0,
    username: "",
    avatar: "",
    authStrategy: "password",
    enable2FA: false,
};

export const defaultContext: AuthContextType = {
    userAuth: defaultUser,
    //isAuth: false,
    updateUser: () => {},
    //switchIsAuth: () => {},
};
