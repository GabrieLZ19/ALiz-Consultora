"use client";

import { Toaster as SileoToaster } from "sileo";
import { useTheme } from "@/lib/themeContext";

export function AppToaster() {
  const { theme } = useTheme();

  const sileoTheme = theme === "midnight" ? "dark" : "light";

  return <SileoToaster position="top-right" theme={sileoTheme} />;
}
