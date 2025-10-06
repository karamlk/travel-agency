import { useThemeProvider } from "../utils/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={currentTheme === "light"}
        onChange={() =>
          changeCurrentTheme(currentTheme === "light" ? "dark" : "light")
        }
      />
      <label
        htmlFor="light-switch"
        className="flex items-center justify-center cursor-pointer w-8 h-8 
                   hover:bg-gray-100 lg:hover:bg-gray-200 
                   dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 
                   rounded-full"
      >
        {currentTheme === "light" ? (
          <Sun size={18} className="text-gray-500/80" />
        ) : (
          <Moon size={18} className="text-gray-400/80" />
        )}
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
