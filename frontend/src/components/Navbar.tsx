import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import logo from "../images/logo.jpg"
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const name=localStorage.getItem('name')
  console.log('name:', name)

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);

    if(isDarkMode){
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    else{
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  };

  return (
    <nav
      className={`flex items-center justify-between py-2 px-8 h-50 ${
        isDarkMode ? "text-white bg-[#254b61]" : "text-black bg-[white]"
      }  sticky top-0 z-10`}
    >
      <Link to={'/'}>
      <div className="text-xl font-bold flex justify-center items-center">
        <img className="w-40 md:w-40 lg:w-60 rounded-lg" src={logo} alt="Logo" />{" "}
        {/* Use the imported logo */}
      </div>
      </Link>
      <div className="flex items-center">
      {name && <h2 className="text-xl font-bold">{name}</h2>}
        <button className="px-2 py-1 rounded" onClick={toggleTheme}>
          {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
    </nav>
  );
};
