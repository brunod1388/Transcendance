import { useRef, useEffect } from "react";

export function useMouse(
    handler: (e: MouseEvent) => void,
    element: HTMLDivElement
) {
    // Create a ref that stores handler
    const savedHandler = useRef<(e: MouseEvent) => void>(() => {});
	const lastMousePosition = useRef<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

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
            const eventListener = (e: MouseEvent) => {
				const { x, y } = e;
				if (x !== lastMousePosition.current.x || y !== lastMousePosition.current.y) {
					lastMousePosition.current.x = x;
					lastMousePosition.current.y = y;
					savedHandler.current(e);
				}
            };
			

            // Add event listener
            element.addEventListener("mousemove", eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener("mousemove", eventListener);
            };
        },
        [element] // Re-run if eventName or element changes
    );
}