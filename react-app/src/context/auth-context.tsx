import { createContext, useContext, useState, useMemo } from "react";
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
