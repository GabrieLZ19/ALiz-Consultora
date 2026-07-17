"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "editorial" | "midnight" | "emerald" | "nude" | "oxford";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("editorial");

  useEffect(() => {
    const body = document.body;
    body.classList.remove(
      "theme-editorial",
      "theme-midnight",
      "theme-emerald",
      "theme-nude",
      "theme-oxford",
    );
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};
