import { createContext, useRef, PropsWithChildren } from "react";

const SERVER_URL = "http://localhost:3000";

export interface UserObj {
    id: number;
    userName: string;
    count: 0;
}
export const UserContext = createContext<UserObj>({} as UserObj);
const defaultUser = { id: -1, userName: "defaultUser", count: 0 };

interface Props {}

export function UserProvider(props: PropsWithChildren<Props>) {
    const user = useRef<any>(defaultUser);

    return (
        <UserContext.Provider value={user.current}>
            {props.children}
        </UserContext.Provider>
    );
}
