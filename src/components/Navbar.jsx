import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../assets/Logo.svg";
import Book from "../assets/Book.svg";
import Folder from "../assets/Folder.svg";
import HomeIcon from "../assets/Home.svg";
import Setting from "../assets/Setting.svg";
import Transmis from "../assets/Transmission.svg";
import Vector from "../assets/Vector.svg";

function Navbar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`pt-5 pl-3 pr-3 h-screen flex flex-col gap-[151px] ${theme === 'dark' ? 'bg-[#1E1E2A]' : 'bg-[#FBFAFF]'}`}>
      <Link>
        <img src={Logo} alt="Logo icon" className="w-16 h-[61px]" />
      </Link>
      <div className="flex flex-col gap-[49px] items-center">
        <Link to="/">
          <img src={HomeIcon} alt="Home icon" />
        </Link>
        <Link to="/profile">
          <img src={Vector} alt="Profile icon" />
        </Link>
        <Link to="/detailes">
          <img src={Book} alt="Details icon" />
        </Link>
        <img
          src={Setting}
          alt="Settings icon"
          className="bg-gray-500 rounded-[50%]"
        />
        <img src={Transmis} alt="Transmission icon" />
        <img src={Folder} alt="Folder icon" />
      </div>
    </div>
  );
}

export default Navbar;
