import { Dispatch } from "react";

export type Action = AddAction | RemoveAction | RemoveAllAction;

export interface AddAction {
    type: ActionType;
    payload: AddPayload;
}

export interface RemoveAction {
    type: ActionType;
    payload: RemovePayload;
}

interface RemoveAllAction {
    type: ActionType;
}

export enum ActionType {
    ADD = "add",
    REMOVE = "remove",
    REMOVE_ALL = "remove_all",
}

interface AddPayload {
    id?: string;
    type: string;
    content: any;
}

interface RemovePayload {
    id: string;
}

export interface Notification {
    id: string;
    type: string;
    content: any;
}

export type State = Notification[];

export type DispatchType = Dispatch<Action>;

export interface ContextType {
    notifications: State;
    dispatchNotifications: DispatchType;
}

// export interface Example extends Notification {}
// export type NotificationObject = Example | Invitation;
