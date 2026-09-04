import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({
  isExpanded = false,
  className = "",
}: {
  isExpanded?: boolean;
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      className={`text-neutral-400 hover:bg-white/5 hover:text-foreground ${
        isExpanded ? "w-full justify-start px-3" : "w-9 justify-center px-0"
      } ${className}`}
      onClick={toggleTheme}
      title={!isExpanded ? "Toggle theme" : undefined}
    >
      <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      {isExpanded && <span className="ml-2">Toggle Theme</span>}
    </Button>
  );
}
