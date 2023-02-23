import { PropsWithChildren } from "react";
import { useReducer, useContext } from "react";
import { createContext, Context } from "react";
import { createPortal } from "react-dom";
import { Notifications } from "../components/notifications";
import {
    State,
    Action,
    AddAction,
    RemoveAction,
    ActionType,
    Notification,
    DispatchType,
    ContextType,
} from "../@types/notifications.types";

export function reducer(state: State, action: Action): State {
    // console.log("dispatched");
    switch (action.type) {
        case ActionType.ADD:
            return addNotification(state, action as AddAction);
        case ActionType.REMOVE:
            return removeNotification(state, action as RemoveAction);
        case ActionType.REMOVE_ALL:
            return [];
        default:
            return state;
    }
}

function addNotification(state: State, action: AddAction): State {
    let id: string;

    if (action.payload.id === undefined) {
        id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    } else {
        id = action.payload.id;
    }
    let newNotification = {
        id: id,
        content: action.payload.content,
        type: action.payload.type,
    };
    return [...state, newNotification];
}

function removeNotification(state: State, action: RemoveAction) {
    return state.filter(
        (value: Notification) => value.id !== action.payload.id
    );
}

export const NotificationsContext: Context<ContextType> =
    createContext<ContextType>({
        notifications: [],
        dispatchNotifications: () => {},
    });

interface Props {}

export function NotificationProvider(props: PropsWithChildren<Props>) {
    const [notifications, dispatchNotifications]: [State, DispatchType] =
        useReducer(reducer, []);
    const notificationsData = { notifications, dispatchNotifications };

    return (
        <NotificationsContext.Provider value={notificationsData}>
            {props.children}
            {createPortal(
                <Notifications notifications={notifications} />,
                document.body
            )}
        </NotificationsContext.Provider>
    );
}

export function close(dispatch: DispatchType, id: string) {
    dispatch({
        type: ActionType.REMOVE,
        payload: {
            id: id,
        },
    });
}

export function useNotifications(): ContextType {
    return useContext(NotificationsContext);
}

export function useNotificationsDispatch(): DispatchType {
    const { dispatchNotifications } = useContext(NotificationsContext);
    return dispatchNotifications;
}
