import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    AuthType,
    AuthContextType,
    //AuthUser,
    defaultUser,
    defaultContext,
} from "../@types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {}

const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider(props: PropsWithChildren<Props>) {
    const { getItem } = useLocalStorage();
    const [Auth, setAuth] = useState<AuthType>({
        userAuth: defaultUser,
        //isAuth: false,
    });

    useEffect(() => {
        window.addEventListener("storage", updateUser);

        return () => {
            window.removeEventListener("storage", updateUser);
        };
    }, []);

    const updateUser = () => {
        const user = getItem("user");
        if (user) {
            setAuth({
                userAuth: JSON.parse(user),
            });
            //    if (!Auth.isAuth) {
            //        switchIsAuth();
            //    }
            //} else if (Auth.isAuth) {
            //    switchIsAuth();
            //}
            //setAuth((prev: AuthType) => ({ userAuth: newUser, isAuth: prev.isAuth }));
        } else {
            setAuth({ userAuth: defaultUser });
        }
    };

    //const switchIsAuth = () => {
    //    setAuth((prev: AuthType) => ({
    //        userAuth: { ...prev.userAuth },
    //        //isAuth: !prev.isAuth,
    //    }));
    //};

    // useMemo hook returns an object (containing Auth & Setters)
    // it tracks any changes in Auth/Setters and only changes providerValue
    // if its dependencies change

    //  const providerValue = useMemo(() => ({ Auth, Setters }), [Auth, Setters]);
    const providerValue = {
        userAuth: Auth.userAuth,
        //isAuth: Auth.isAuth,
        updateUser: updateUser,
        //switchIsAuth: switchIsAuth,
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
