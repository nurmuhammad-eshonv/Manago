import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`h-[76px] pt-4 pb-4 flex items-center pr-10 ${
        theme === "dark" ? "bg-[#10141E]" : "bg-[#FFFFFF]"
      }`}
    >
      <label
        className={`input input-bordered flex items-center gap-2 w-[290px] h-[44px] ${
          theme === "dark" ? "bg-[#1F2A37]" : "bg-[#F3F7FA]"
        } rounded-[7px] p-5 mx-auto`}
      >
        <input
          type="text"
          className={`grow ${
            theme === "dark"
              ? "bg-[#1F2A37] text-white"
              : "bg-[#F3F7FA] text-black"
          } outline-none`}
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={`h-6 w-6 ${
            theme === "dark" ? "text-white opacity-70" : "opacity-70"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="flex items-center gap-[30px]">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />

          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 1 0 0-1.5H12ZM7.757 6.272a.75.75 0 1 0 1.06 1.06L8.82 6.09a.75.75 0 0 0-1.061-1.061l-.002.002ZM5.75 11.992a.75.75 0 0 0 0 1.5H6a.75.75 0 0 0 0-1.5h-.25Zm11.5 0a.75.75 0 0 0 0 1.5h.25a.75.75 0 0 0 0-1.5h-.25Zm-8.482 4.671a.75.75 0 0 0-1.06 1.061l.02.02a.75.75 0 0 0 1.06-1.061l-.02-.02Zm6.707-9.488a.75.75 0 0 0 1.06 1.061l.02-.02a.75.75 0 1 0-1.06-1.061l-.02.02Zm-4.646-.858A4.505 4.505 0 0 0 7.5 12c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5S14.485 7.5 12 7.5ZM8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm8.057 4.926a.75.75 0 0 0-1.06-1.06l-.02.02a.75.75 0 0 0 1.06 1.061l.02-.02ZM12 18.25a.75.75 0 1 0 0 1.5h.008a.75.75 0 1 0 0-1.5H12Zm-4.243-.682a.75.75 0 0 0-1.061-1.06l-.02.02a.75.75 0 0 0 1.06 1.061l.021-.021Z" />
          </svg>

          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05A1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-10 ${
              theme === "dark" ? "text-white" : "text-gray-500"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 15h-1v-2a4 4 0 10-8 0v2H9a2.032 2.032 0 00-1.595.595L6 17h5m0 0v2a2 2 0 104 0v-2z"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
            2
          </span>
        </div>

        <Link to="/profile">
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar">
              <div className="w-12">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User"
                />
              </div>
            </div>
            <div className="avatar placeholder w-8 h-8">
              <div className="bg-neutral text-neutral-content">
                <span>+1</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
