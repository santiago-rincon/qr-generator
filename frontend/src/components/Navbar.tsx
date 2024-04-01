import { MoonIcon } from "@icons/Moon";
import { SunIcon } from "@icons/Sun";
import { GithubIcon } from "@icons/Github";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme !== null) {
      setTheme(localTheme);
      document.documentElement.classList.toggle("dark", localTheme === "dark");
    } else {
      const preferDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(preferDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", preferDark);
      localStorage.setItem("theme", preferDark ? "dark" : "light");
    }
  }, []);
  const handleClick = () => {
    const currentTheme = theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark", currentTheme === "light");
    localStorage.setItem("theme", currentTheme === "dark" ? "light" : "dark");
  };
  return (
    <header className="flex transition-colors justify-between items-center px-4 md:px-10 h-[12vh] bg-slate-300 dark:bg-neutral-900 w-full border-b border-black/20 dark:border-white/20">
      <div className="flex items-center gap-x-2">
        <h1 className="text-xl md:text-4xl font-bold">QR Generator</h1>
      </div>
      <div className="flex justify-center items-center gap-x-5 border-s border-black/20 dark:border-white/20 ps-4">
        <button onClick={handleClick}>
          {theme === "dark" || theme === null ? (
            <SunIcon className="size-6 md:size-8 text-black/70 dark:text-white/80" />
          ) : (
            <MoonIcon className="size-6 md:size-8 text-black/70 dark:text-white/80" />
          )}
        </button>
        <a
          href="https://github.com/santiago-rincon/qr-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="size-6 md:size-8 text-black/70 dark:text-white/80" />
        </a>
      </div>
    </header>
  );
};
