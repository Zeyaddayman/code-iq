import { useState } from "react"
import { DEFAULT_THEME_NAME, ThemeName, THEMES } from "../../constants"

const getDefaultTheme = (): ThemeName => {
    let themeName: ThemeName

    const savedTheme = localStorage.getItem("theme")

    if (savedTheme && THEMES.some(theme => theme.name === savedTheme)) {
        themeName = savedTheme as ThemeName
    } else {
        themeName = window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : DEFAULT_THEME_NAME
    }

    document.body.setAttribute("data-theme", themeName)
    localStorage.setItem("theme", themeName)

    return themeName
}

const ThemeSwitcher = () => {

    const [themeName, setThemeName] = useState(getDefaultTheme())

    const handleChangeTheme = (themeName: ThemeName) => {
        document.body.setAttribute("data-theme", themeName)
        localStorage.setItem("theme", themeName)
        setThemeName(themeName)
    }

    return (
        <div className="flex items-center gap-4">
            {THEMES.map((theme) => (
                <button
                    key={theme.name}
                    className={`h-12 flex-1 text-white rounded-md transition`}
                    style={{ backgroundColor: themeName === theme.name ? theme.color : theme.lightColor }}
                    onClick={() => handleChangeTheme(theme.name)}
                >
                    {theme.name}
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher