import { useState } from "react"
import { ThemeName, THEMES } from "../../constants"

const getDefaultTheme = (): ThemeName => {
    const savedTheme = localStorage.getItem("theme") as ThemeName

    return savedTheme
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
                    className={`h-12 flex-1 text-white rounded-md transition ${themeName === theme.name ? "ring-2 ring-secondary" : ""}`}
                    style={{ backgroundColor: theme.color }}
                    onClick={() => handleChangeTheme(theme.name)}
                >
                    {theme.name}
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher