import { PropsWithChildren, useState } from "react";
import style from "../../assets/styles/PopUp.module.css";

// // const DEFAULT: number = 0;
// const ACCEPTED: number = 1;
// const DECLINED: number = 2;

interface Result {
    data: any;
    accepted: (data: any) => void;
    declined: (data: any) => void;
}

export function AcceptDeclinePopUp(props: PropsWithChildren<Result>) {
    const [isOpen, setIsOpen] = useState<number>(0);

    if (isOpen < 0) {
        return null;
    }

    return (
        <div className={style.PopUp}>
            <div className={style.content}>{props.children}</div>
            <div className={style.buttonWrapper}>
                <button
                    className={style.accept}
                    onClick={() => {
                        props.accepted(props.data);
                        setIsOpen(-1);
                    }}
                >
                    Accept
                </button>
                <button
                    className={style.decline}
                    onClick={() => {
                        props.declined(props.data);
                        setIsOpen(-1);
                    }}
                >
                    Decline
                </button>
            </div>
        </div>
    );
    // }
}
