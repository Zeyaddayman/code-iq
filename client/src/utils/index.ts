import { DEFAULT_THEME_NAME, ThemeName, THEMES } from "../constants"

export const applyTheme = (): void => {
    let themeName: ThemeName

    const savedTheme = localStorage.getItem("theme")

    if (savedTheme && THEMES.some(theme => theme.name === savedTheme)) {
        themeName = savedTheme as ThemeName
    } else {
        themeName = window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : DEFAULT_THEME_NAME
    }

    document.body.setAttribute("data-theme", themeName)
    localStorage.setItem("theme", themeName)
}

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}