import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // Link o'rniga NavLink foydalanamiz
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../assets/Logo.svg";
import Book from "../assets/Book.svg";
import Folder from "../assets/Folder.svg";
import HomeIcon from "../assets/Home.svg";
import Transmis from "../assets/transmission.svg";
import Vector from "../assets/Vector.svg";
import { CiSettings } from "react-icons/ci";

function Navbar() {
  const { theme } = useContext(ThemeContext)



  return (
    <div
      className={`pt-5 pl-3 pr-3 h-screen flex flex-col gap-[151px] fixed left-0 top-0 z-50 w-[80px] ${
        theme === "dark" ? "bg-[#1E1E2A]" : "bg-[#FBFAFF]"
      }`}
    >
      <NavLink to="/">
        <img src={Logo} alt="Logo icon" className="w-16 h-[61px]" />
      </NavLink>
      <div className="flex flex-col gap-[49px] items-center ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center transition duration-200 hover:scale-110 active:scale-95 ${
              isActive
                ? theme === "dark"
                  ? "bg-gray-700 rounded p-1"
                  : "bg-gray-200 rounded p-1"
                : ""
            }`
          }
        >
          <img src={HomeIcon} alt="Home icon" />
        </NavLink>
        <NavLink
          to="/dosc"
          className={({ isActive }) =>
            `flex flex-col items-center transition duration-200 hover:scale-110 active:scale-95 ${
              isActive
                ? theme === "dark"
                  ? "bg-gray-700 rounded p-1"
                  : "bg-gray-200 rounded p-1"
                : ""
            }`
          }
        >
          <img src={Vector} alt="Profile icon" />
        </NavLink>
        <NavLink
          to="/detailes"
          className={({ isActive }) =>
            `flex flex-col items-center transition duration-200 hover:scale-110 active:scale-95 ${
              isActive
                ? theme === "dark"
                  ? "bg-gray-700 rounded p-1"
                  : "bg-gray-200 rounded p-1" 
                : ""
            }`
          }
        >
          <img src={Book} alt="Details icon" />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center transition duration-200 hover:scale-110 active:scale-95 ${
              isActive
                ? theme === "dark"
                  ? "bg-gray-700 rounded p-1"
                  : "bg-gray-200 rounded p-1"
                : ""
            }`
          }
        >
          <CiSettings className="h-6 w-6" />
        </NavLink>
        <NavLink
          to="/message"
          className={({ isActive }) =>
            `flex flex-col items-center transition duration-200 hover:scale-110 active:scale-95 ${
              isActive
                ? theme === "dark"
                  ? "bg-gray-700 rounded p-1"
                  : "bg-gray-200 rounded p-1"
                : ""
            }`
          }
        >
          <img src={Transmis} alt="Transmission icon" />
        </NavLink>
        <NavLink
          to="/folders"
          className={({ isActive }) =>
            `flex flex-col items-center transition duration-200 hover:scale-110 active:scale-95 ${
              isActive
                ? theme === "dark"
                  ? "bg-gray-700 rounded p-1"
                  : "bg-gray-200 rounded p-1"
                : ""
            }`
          }
        >
          <img src={Folder} alt="Folder icon" />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
