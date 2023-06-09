import { useRef, useEffect } from "react";

export function useKeyboard(handler: (e: KeyboardEvent) => void, element: Document = document) {
    // Create a ref that stores handler
    const savedHandler = useRef<(e: KeyboardEvent) => void>(() => {});

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // Create event listener that calls handler function stored in ref
            const eventListener = (e: KeyboardEvent) => {
                savedHandler.current(e);
            };

            // Add event listener
            element.addEventListener("keydown", eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener("keydown", eventListener);
            };
        },
        [element] // Re-run if eventName or element changes
    );
}
