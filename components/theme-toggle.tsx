"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-10 h-10" />
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            // Используем grid place-items-center, чтобы иконки были идеально по центру
            className="grid place-items-center w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
            aria-label="Toggle theme"
        >
            {/* Иконки накладываются друг на друга (обе в первой ячейке грида) */}
            <Sun className={`col-start-1 row-start-1 h-5 w-5 transition-all duration-300 ${resolvedTheme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
            <Moon className={`col-start-1 row-start-1 h-5 w-5 transition-all duration-300 ${resolvedTheme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
        </button>
    )
}