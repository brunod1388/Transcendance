import { useState, useRef, useEffect } from "react";

function useVisible(defaultIsVisible: boolean) {
    const [isVisible, setIsVisible] = useState(defaultIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) setIsVisible(false);
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => document.removeEventListener("click", handleClickOutside, true);
    }, []);

    return { ref, isVisible, setIsVisible };
}

export { useVisible };
