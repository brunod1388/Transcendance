import { PropsWithChildren } from "react";

interface Props {}

export function Board(props: PropsWithChildren<Props>) {
    return (
        <>
            <div
                style={{
                    position: "relative",
                    height: "100px",
                    width: "100px",
                    backgroundColor: "red",
                }}
            >
                {props.children}
            </div>
        </>
    );
}
