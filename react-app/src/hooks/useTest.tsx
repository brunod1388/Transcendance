import { useContext, useState, useEffect } from "react";
import { UserContext, UserObj } from "../context/test-context";

export function useUser(): any {
    const user = useContext(UserContext);
    return user;
}
