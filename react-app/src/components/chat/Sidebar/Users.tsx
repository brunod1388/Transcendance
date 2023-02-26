import React from "react";
import User from "./User";

type Props = {
    isPrivate?: boolean;
    isNewMessage?: boolean;
};

export default function Users(props: Props) {
    const { isPrivate = false, isNewMessage = true } = props;

    return (
        <div className="users">
            {[...Array(20)].map((e, i) => (
                <User isNew={i % 3 === 0 ? true : false} keyId={`d${i}`}/>
            ))}
        </div>
    );
}
