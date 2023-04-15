import { useNotificationsDispatch } from "hooks";
import { removeNotification } from "utils/notifications.utils";
import { Notification } from "@customTypes";
import "../styles/gameNotification.scss";

interface Props {
    notifications: Notification[];
}

// List of notifications
export function Notifications({ notifications }: Props) {
    return (
        <div className="game-notifications">
            <div className="notifications-container">
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
    const notificationType = notification.type; 

    return (
        <div className={"notification-item " + notificationType}>
            {renderContent(notification.content)}
        </div>
    );
}

// The content can be a function returning a component or some text
const renderContent = (content: any) => {
    if (typeof content === "function") {
        // We get the component by executing the function
        return content();
    }
    return <pre>{JSON.stringify(content, null, 2)}</pre>;
};
