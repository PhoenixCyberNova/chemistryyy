import { useStudent } from "@/lib/student/store";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const theme = useStudent((s) => s.theme);
  const setTheme = useStudent((s) => s.setTheme);
  const light = theme === "light";
  return (
    <button
      type="button"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => setTheme(light ? "dark" : "light")}
      className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-border text-muted transition-[opacity,transform] duration-150 hover:text-fg active:scale-[0.96]"
    >
      <span className="relative inline-block size-4">
        <Sun
          className={`absolute inset-0 size-4 transition-[opacity,transform,filter] duration-300 ${
            light ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"
          }`}
        />
        <Moon
          className={`absolute inset-0 size-4 transition-[opacity,transform,filter] duration-300 ${
            light ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"
          }`}
        />
      </span>
    </button>
  );
}
