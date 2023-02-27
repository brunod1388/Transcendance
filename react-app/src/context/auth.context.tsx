import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
    AuthType,
    AuthContextType,
    AuthUser,
    Token,
    defaultUser,
    defaultContext,
} from "../@types";

interface Props {}

const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider(props: PropsWithChildren<Props>) {
    const [Auth, setAuth] = useState<AuthType>({
        userAuth: defaultUser,
        token: "",
    });

    const updateUser = (newUser: AuthUser) => {
        setAuth((prev: AuthType) => ({ userAuth: newUser, token: prev.token }));
    };

    const updateToken = (newToken: Token) => {
        setAuth((prev: AuthType) => ({
            userAuth: { ...prev.userAuth },
            token: newToken,
        }));
    };

    // useMemo hook returns an object (containing Auth & Setters)
    // it tracks any changes in Auth/Setters and only changes providerValue
    // if its dependencies change

    //  const providerValue = useMemo(() => ({ Auth, Setters }), [Auth, Setters]);
    const providerValue = {
        userAuth: Auth.userAuth,
        token: Auth.token,
        updateUser: updateUser,
        updateToken: updateToken,
    };

    return (
        <AuthContext.Provider value={providerValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}

/*
import { createContext, useContext, useState } from "react";
import { AuthType } from "../@types/auth.interface";
import { User } from "../@types/user.interface";

const AuthContext = createContext<any>(null);

export function AuthProvider(props: any) {
    const [Auth, setAuth] = useState<AuthType>({
        user: {
            id: -1,
            username: "",
            authStrategy: "42",
            enable2FA: false,
        },
        jwt_token: "",
    });

    const Setters = {
        updateUser(newUser: User) {
            setAuth((prevState: AuthType) => ({
                user: newUser,
                jwt_token: prevState.jwt_token,
            }));
        },
        updateToken(token: string) {
            setAuth((prevState: AuthType) => ({
                user: { ...prevState.user },
                jwt_token: token,
            }));
        },
    };

    // useMemo hook returns an object (containing Auth & Setters)
    // it tracks any changes in Auth/Setters and only changes providerValue
    // if its dependencies change
    //  const providerValue = useMemo(() => ({ Auth, Setters }), [Auth, Setters]);
    const providerValue = [Auth, Setters];

    return (
        <AuthContext.Provider value={providerValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth(): [
    AuthType,
    {
        updateUser: (user: User | undefined) => void;
        updateToken: (token: string | undefined) => void;
    }
] {
    return useContext(AuthContext);
}
*/
