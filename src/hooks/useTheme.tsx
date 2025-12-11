import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first, default to dark if not set
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme") as Theme | null;
            return savedTheme || "dark";
        }
        return "dark";
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove both classes first
        root.classList.remove("light", "dark");

        // Add the current theme class
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
};
