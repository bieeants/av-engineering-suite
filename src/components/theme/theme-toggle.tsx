"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const nextTheme =
    theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  return (
    <Button
      aria-label="Toggle theme"
      onClick={() => setTheme(nextTheme)}
      size="icon"
      title="Toggle theme"
      type="button"
      variant="outline"
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
      <Monitor className="sr-only" />
    </Button>
  );
}
