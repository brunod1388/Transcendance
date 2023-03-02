import React from "react";
import User from "./User";

type Props = {
    isPrivate?: boolean;
    isNewMessage?: boolean;
};

export default function Users(props: Props) {
    return (
        <div className="users">
            {[...Array(20)].map((e, i) => (
                <User
                    isPrivate={true}
                    isNew={i % 3 === 0 ? true : false}
                    keyId={`d${i}`}
                    key={i}
                />
            ))}
        </div>
    );
}
