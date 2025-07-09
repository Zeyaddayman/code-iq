import { useState } from "react"
import { THEMES } from "../../constants"

const ThemeSwitcher = () => {

    const [checked, setChecked] = useState("Mint")

    return (
        <div className="flex items-center gap-4">
            {THEMES.map((theme) => (
                <button
                    key={theme.name}
                    className={`h-12 flex-1 text-white rounded-md transition ${checked === theme.name ? "opacity-100" : "opacity-60"}`}
                    style={{ backgroundColor: theme.color }}
                    onClick={() => setChecked(theme.name)}
                >
                    {theme.name}
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher