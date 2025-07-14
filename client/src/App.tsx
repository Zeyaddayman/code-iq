import { RouterProvider } from "react-router-dom";
import router from "./router";
import { DEFAULT_THEME_NAME, ThemeName, THEMES } from "./constants";

const applyTheme = (): void => {
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

const App = () => {
    applyTheme();
    
    return (
        <RouterProvider router={router} />
    )
}

export default App;