// // src/components/Toast

// import React from "react";
// import { style } from "../styles/notifications.module.css";

// interface NotificationType {
//     type: string;
//     id: string;
//     content: any;
// }

// function renderItem(content) {
//     if (typeof content === "function") {
//         return content();
//     } else {
//         return <pre>{JSON.stringify(content, null, 2)}</pre>;
//     }
// }

// function NotificationList(): JSX.element[] {
//     let notif1: NotificationType = { type: "lol", id: "123", content: "pop" };
//     let notif2: NotificationType = { type: "lal", id: "1", content: "papou" };

//     let notifications: NotificationType[] = Array<NotificationType>(
//         notif1,
//         notif2
//     );

//     const List: JSX.element[] = notifications.map(
//         (notification: NotificationType) => {
//             return (
//                 <div
//                     className={style.notificationItem + notification.type}
//                     key={notification.id}
//                 >
//                     <span
//                         role="img"
//                         aria-label="close notif"
//                         className={style.notificationClose}
//                     >
//                         &times;
//                     </span>
//                     {renderItem(notification.content)}
//                 </div>
//             );
//         }
//     );
//     return List;
// }

// export function Notification({ toast }) {
//     let NotificationList: JSX.element[] = NotificationList();
//     return (
//         <div className={style.notifications}>
//             <div className={style.notificationsContainer}>
//                 {NotificationList}
//             </div>
//         </div>
//     );
// }

export {};
