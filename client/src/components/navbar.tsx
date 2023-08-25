import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  };

  useEffect(() => {
    let theme = localStorage.theme;
    if (!theme) {
      theme = "light";
    }
    setTheme(theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-base-100 mb-4 shadow-md">
        <div className="flex-1">
          <a href="/" className="normal-case text-xl pl-4">
            PandoraPost
          </a>
        </div>
        <div className="flex-none pr-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={toggleTheme} checked={theme === "dark" ? true : false} />

            {/* sun icon */}
            <img src="/sun.svg" className={`swap-on w-8 h-8`} alt="sun" />

            {/* moon icon */}
            <img src="/moon.svg" className={`swap-off w-8 h-8`} alt="moon" />
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;
