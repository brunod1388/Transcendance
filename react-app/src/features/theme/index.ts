import style from "./styles/theme.module.css";
import { useContext, useState, createContext, PropsWithChildren } from "react";
import {
    ThemeProvider,
    ThemeContext,
    ThemeUpdateContext,
} from "../../context/theme-context";

import {
    useTheme,
    useThemeUpdate,
    useThemeStyle,
} from "../../hooks/theme-hooks";

export {
    style,
    useContext,
    useState,
    createContext,
    type PropsWithChildren,
    ThemeProvider,
    ThemeContext,
    ThemeUpdateContext,
    useTheme,
    useThemeUpdate,
    useThemeStyle,
};
