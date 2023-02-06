import { createContext, useState, PropsWithChildren } from "react";
import {useThemeStyle} from '../features/theme/hooks/theme-hooks';

interface Props {}

export const ThemeContext = createContext<boolean>(false);
export const ThemeUpdateContext = createContext<() => void>(() => {});

export function ThemeProvider(props: PropsWithChildren<Props>) {
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const theme: string = useThemeStyle();
    function changeTheme(): void {
        setDarkTheme((prevDarkTheme: boolean) => !prevDarkTheme);
        applyTheme(theme);
    }

    const applyTheme = (theme: string) => {
        var element = document.body;
        element.style.cssText = "transition: background .5s ease";
        element.classList.toggle(theme);
    };

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={changeTheme}>
                {props.children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}
