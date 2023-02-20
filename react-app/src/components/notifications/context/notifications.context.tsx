// import React, { createContext, useReducer, PropsWithChildren } from "react";
// import { createPortal } from "react-dom";
// import Toast from "../components/Toast";
// import "../styles/toast.scss";

// export const NotificationContext = createContext();

// const initialState = [];

// export const ADD = "ADD";
// export const REMOVE = "REMOVE";
// export const REMOVE_ALL = "REMOVE_ALL";

// export function NotificationReducer(state, action) {
//     if (action.type === ADD) {
//         return [
//             ...state,
//             {
//                 id: +new Date(),
//                 content: action.payload.type,
//                 type: action.payload.type,
//             },
//         ];
//     } else if (action.type === REMOVE) {
//         return state.filter((t) => t.id !== action.payload.id);
//     } else if (action.type === REMOVE_ALL) {
//         return initialState;
//     } else {
//         return state;
//     }
// }

// interface Props {}

// export function NotificationProvider(props: PropsWithChildren<Props>) {
//     const [notification, notificationDispatch] = useReducer(
//         NotificationReducer,
//         []
//     );
//     const toastData = { toast, toastDispatch };
//     return (
//         <ToastContext.Provider value={toastData}>
//             {props.children}

//             {createPortal(<Toast toast={toast} />, document.body)}
//         </ToastContext.Provider>
//     );
// }

export {};
