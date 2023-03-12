import style from "./notifications.module.scss";
import { useNotificationsDispatch } from "../../hooks";
import { getStyle, removeNotification } from "../../utils/notifications.utils";
import { Notification } from "../../@types";

interface Props {
    notifications: Notification[];
}

// List of notifications
export function Notifications({ notifications }: Props) {
    return (
        <div className={style.notifications}>
            <div className={style.notificationsContainer}>
                {notifications.map((value: Notification) => (
                    <NotificationItem key={value.id} {...value} />
                ))}
            </div>
        </div>
    );
}

// Single notification
function NotificationItem(notification: Notification) {
    const dispatch = useNotificationsDispatch();
    let divStyle: string = style.notificationItem + getStyle(notification.type);

    return (
        <div className={divStyle}>
            <span
                role="img"
                className={style.closeCross}
                onClick={() => removeNotification(notification.id, dispatch)}
            >
                &times;
            </span>
            {renderContent(notification.content)}
        </div>
    );
}

const renderContent = (content: any) => {
    if (typeof content === "function") {
        return content();
    }
    return <pre>{JSON.stringify(content, null, 2)}</pre>;
}