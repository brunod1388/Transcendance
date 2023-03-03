import { useContext } from "react";
import { UserContext } from "../context/test-context";

export function useUser(): any {
    const user = useContext(UserContext);
    return user;
}
