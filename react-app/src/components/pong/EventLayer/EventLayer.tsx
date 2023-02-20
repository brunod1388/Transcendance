import { useEffect, useState } from "react";
import { Event } from "../Event/Event";
import { pongInvitation } from "../Event/Invitation/Invitation";

import style from "./EventLayer.module.css";

// interface Props {
// 	eventList: Event<any>[];
// 	// setEventList: React.Dispatch<React.SetStateAction<number>>;
// }

type EventType = Event;
type EventListType = EventType[];

function startEvents(
    eventList: EventListType,
    setEventList: React.Dispatch<React.SetStateAction<EventListType>>
) {
    console.log("enter");
    pongInvitation(eventList, setEventList);
    console.log(`value eventlist: ${eventList}`);
}

export function EventLayer() {
    const [eventList, setEventList] = useState<EventListType>([]);
    useEffect(() => {
        startEvents(eventList, setEventList);
    }, [eventList]);

    if (eventList.length === 0) {
        return null;
    }
    return (
        <div className={style.eventLayer}>
            {eventList.map((element: EventType) => (
                <>{element.component}</>
            ))}
        </div>
    );
}
