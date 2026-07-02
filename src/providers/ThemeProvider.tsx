import { useEffect, useState, type ReactNode } from "react";

import { ThemeContext, type Theme } from "@/context/ThemeContext";

const THEME_STORAGE_KEY = "theme";

type ThemeProviderProps = {
	children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	function toggleTheme() {
		setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
	}

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

function getStoredTheme(): Theme {
	if (typeof window === "undefined") {
		return "light";
	}

	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

	return storedTheme === "dark" || storedTheme === "light"
		? storedTheme
		: "light";
}
