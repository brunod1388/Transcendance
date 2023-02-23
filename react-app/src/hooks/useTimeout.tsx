import { useRef, useEffect } from "react";

export function useTimeout(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>(() => {});

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        if (delay > 0) {
            let timer = setTimeout(tick, delay);
            return () => clearTimeout(timer);
        }
    }, [delay]);
}
