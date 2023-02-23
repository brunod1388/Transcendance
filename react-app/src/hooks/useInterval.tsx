import { useRef, useEffect } from "react";

export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>(() => {});

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current !== null) {
                savedCallback.current();
            }
        }
        const timer = setInterval(tick, delay);
        return () => clearInterval(timer);
    }, [delay]);
}
