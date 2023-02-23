import style from "./notifications.module.scss";
import { ActionType } from "../../@types";
import { useNotifications } from "../../context";
import React from "react";

interface Props {
    notifications: Notification[];
}

interface Notification {
    id: string;
    type: string;
    content: any;
}

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

function NotificationItem(value: Notification) {
    const { dispatchNotifications } = useNotifications();
    let divStyle: string = style.notificationItem + getStyle(value.type);

    const removeOnCLick = (valueId: string) => {
        let removeAction = {
            type: ActionType.REMOVE,
            payload: { id: valueId },
        };
        return removeAction;
    };

    const renderItem = (content: any) => {
        if (typeof content === "function") {
            return content();
        }
        return <pre>{JSON.stringify(content, null, 2)}</pre>;
    };

    return (
        <div className={divStyle}>
            <span
                role="img"
                className={style.closeCross}
                onClick={() => dispatchNotifications(removeOnCLick(value.id))}
            >
                &times;
            </span>
            {renderItem(value.content)}
        </div>
    );
}

function getStyle(type: string): string {
    if (type === "info") {
        return " " + style.info;
    } else if (type === "danger") {
        return " " + style.danger;
    }
    return "";
}
