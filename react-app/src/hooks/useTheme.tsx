import {
    themeStyle,
    useContext,
    ThemeContext,
    ThemeUpdateContext,
} from "./index";

export function useTheme(): boolean {
    return useContext(ThemeContext);
}

export function useThemeUpdate(): () => void {
    return useContext(ThemeUpdateContext);
}

export function useThemeStyle(): string {
    if (useTheme() === true) return themeStyle.lightTheme;
    return themeStyle.darkTheme;
}
