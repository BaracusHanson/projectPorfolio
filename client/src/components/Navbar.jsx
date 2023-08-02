import React from "react";
import { useContext } from "react";
import { ctx } from "../App";

const Navbar = () => {
  const { theme, handleTheme } = useContext(ctx);
  return (
    <nav
      className="flex items-center justify-between px-4 py-2 bg-[#fefe] text-black absolute top-0 left-0 z-50 w-full"
      id={theme}
    >
      <div className="text-xl font-bold">Baracus</div>
      <div className="text-xl font-bold">register</div>
      <div className="text-xl font-bold">Login</div>

      <button
        className={`${
          theme === "light"
            ? "px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded mx-4 text-slate-950"
            : "px-4 py-2 bg-slate-200 hover:bg-blue-900 rounded mx-4 hover:text-slate-100 text-slate-900"
        }`}
        // id={theme}
        onClick={handleTheme}
      >
        Thème
      </button>
    </nav>
  );
};

export default Navbar;
