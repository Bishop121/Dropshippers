import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cheinly-theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggle } = useTheme();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className={className}
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-gold" /> : <Moon className="h-5 w-5 text-gold" />}
    </Button>
  );
};
