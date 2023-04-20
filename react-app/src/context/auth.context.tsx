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
    defaultUser,
    defaultContext,
} from "@customTypes";
import { useLocalStorage } from "hooks/useLocalStorage";

interface Props {}

const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider(props: PropsWithChildren<Props>) {
    const { getItem } = useLocalStorage();
    const [Auth, setAuth] = useState<AuthType>({
        userAuth:
            JSON.parse(localStorage.getItem("user") || "null") || defaultUser,
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
        } else {
            setAuth({ userAuth: defaultUser });
        }
    };

    const providerValue = {
        userAuth: Auth.userAuth,
        updateUser: updateUser,
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
