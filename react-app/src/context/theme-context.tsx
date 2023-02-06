import {
    createContext,
    useState,
    PropsWithChildren,
    useThemeStyle,
} from "./index";

interface Props {}

export const ThemeContext = createContext<boolean>(false);
export const ThemeUpdateContext = createContext([]);

export function ThemeProvider(props: PropsWithChildren<Props>) {
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const theme: string = useThemeStyle();
	const  lol = () => changeTheme;
    function changeTheme(): void {
        setDarkTheme((prevDarkTheme) => !prevDarkTheme);
        applyTheme(theme);
    }

    const applyTheme = (theme: string) => {
        var element = document.body;
        element.style.cssText = "transition: background .5s ease";
        element.classList.toggle(theme);
    };

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={lol}>
                {props.children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}
