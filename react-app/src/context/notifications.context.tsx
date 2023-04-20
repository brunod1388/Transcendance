import { PropsWithChildren } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { Notifications } from "components/gameInvitations";
import {
    State,
    Action,
    AddAction,
    RemoveAction,
    ActionType,
    Notification,
    NotificationsContextType,
} from "@customTypes/notifications.types";
import { createId } from "utils";

// Notifications context has:
// - one list of notifications
// - one dispatch function used to update the list
export const NotificationsContext = createContext<NotificationsContextType>({
    notifications: [],
    dispatch: () => {},
});

// A reducer is similar to a react state with a more complex logic.
// Using the dispatch function we can realize three action:
// - adding a new notification (ActionType.ADD)
// - removing a new notification (ActionType.REMOVE)
// - removing all notifications (ActionType.REMOVE_ALL)
export function reducer(state: State, action: Action): State {
    console.log(state);
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

// Add a notification when receiving an ActionType.ADD
function addNotification(state: State, action: AddAction): State {
    let id: string;

    if (action.payload.id === undefined) {
        id = createId();
    } else {
        id = action.payload.id;
    }
    return [
        ...state,
        {
            id: id,
            content: action.payload.content,
            type: action.payload.type,
        },
    ];
}

// Remove a notification when receiving an ActionType.REMOVE
function removeNotification(state: State, action: RemoveAction) {
    return state.filter((value: Notification) => value.id !== action.payload.id);
}

interface Props {}

// CreatePortal is used to render a child into a different part of the DOM
// More about:  https://beta.reactjs.org/reference/react-dom/createPortal
export function NotificationProvider(props: PropsWithChildren<Props>) {
    const [notifications, dispatch] = useReducer(reducer, []);
    const value = { notifications, dispatch };

    return (
        <NotificationsContext.Provider value={value}>
            {props.children}
            {createPortal(<Notifications notifications={notifications} />, document.body)}
        </NotificationsContext.Provider>
    );
}
