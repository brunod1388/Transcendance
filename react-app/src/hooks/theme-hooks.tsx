import {style} from './index';
import { useContext } from "react";
import { ThemeContext, ThemeUpdateContext } from "../context/theme-context";

export function useTheme(): boolean {
    return useContext(ThemeContext);
}

export function useThemeUpdate(): () => void {
    return useContext(ThemeUpdateContext);
}

export function useThemeStyle(): string {
    if (useTheme() === true) return style.lightTheme;
    return style.darkTheme;
}
