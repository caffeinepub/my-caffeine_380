import { useCallback, useEffect, useState } from "react";

function applyDark(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function useDarkMode() {
  const [isDark, setIsDarkState] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    applyDark(isDark);
  }, [isDark]);

  // Apply on mount immediately
  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "dark";
    applyDark(stored);
    setIsDarkState(stored);
  }, []);

  const setDark = useCallback((value: boolean) => {
    try {
      localStorage.setItem("darkMode", value ? "dark" : "light");
    } catch {}
    applyDark(value);
    setIsDarkState(value);
  }, []);

  const toggle = useCallback(() => {
    setDark(!isDark);
  }, [isDark, setDark]);

  return { isDark, toggle, setDark };
}
