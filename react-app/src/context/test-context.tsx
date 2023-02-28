import { createContext, PropsWithChildren, useContext, useState } from "react";

interface UserType {
    id:number;
    userName: string;
}

interface UserContextType {
    user: UserType;
    setUser: (id: number, userName: string) => void;
}
const defaultUser = {id: -1, userName: "defaultName"};
const defaultContext = {
    user: defaultUser,
    setUser: (id: number, userName: string) => {}
};

const UserContext = createContext<UserContextType>(defaultContext);

interface Props {}

function UserProvider(props: PropsWithChildren<Props>) {
    const [user, setUser] = useState<UserType>(defaultUser);

    const setUserVal = (id: number, name: string) => {
        setUser({id: id, userName: name});
    }

    const userValue = {
        user: user,
        setUser: setUserVal
    };
    return (
        <UserContext.Provider value={userValue}>
            {props.children}
        </UserContext.Provider>
    );
}

function useUser(): UserContextType {
    return useContext(UserContext);
}

export {UserProvider, useUser};