import style from "../components/notifications/notifications.module.scss";
import { ActionType, DispatchType } from "../@types";

export function getStyle(type: string): string {
    if (type === "info") {
        return " " + style.info;
    } else if (type === "danger") {
        return " " + style.danger;
    }
    return "";
}

export function addNotification(
    id: string,
    type: string,
    content: any,
    dispatch: DispatchType
) {
    dispatch({
        type: ActionType.ADD,
        payload: {
            id: id,
            type: type,
            content: content,
        },
    });
}

export function removeNotification(id: string, dispatch: DispatchType) {
    dispatch({
        type: ActionType.REMOVE,
        payload: {
            id: id,
        },
    });
}

export function createId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}