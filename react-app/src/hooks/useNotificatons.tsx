import { useContext } from "react";
import { DispatchType, NotificationsContextType } from "@customTypes";
import { NotificationsContext } from "context";

export function useNotifications(): NotificationsContextType {
    return useContext(NotificationsContext);
}

export function useNotificationsDispatch(): DispatchType {
    const { dispatch } = useContext(NotificationsContext);
    return dispatch;
}
