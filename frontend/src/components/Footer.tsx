export const Footer = () => {
  return (
    <header className="flex transition-colors justify-center items-center h-[12vh] bg-slate-300 dark:bg-neutral-900 w-full border-t border-black/20 dark:border-white/20">
      &copy; {new Date().getFullYear()} -
      <a
        href="https://www.linkedin.com/in/cristian-santiago-rincon-caicedo/"
        target="_blank"
        className="hover:underline ms-1"
        rel="noopener noreferrer"
      >
        Cristian Santiago Rincón.
      </a>
    </header>
  );
};
