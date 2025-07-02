"use client";

import React from "react";
import DarkModeIcon from "../../assets/icons/Modes.svg";
import { useTheme } from "./ThemeContext";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-[45px] h-[23px] flex items-center bg-gray-200 dark:bg-gray-700 rounded-full  transition-colors duration-300`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <div
        className={`absolute w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center bg-white dark:bg-black ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        <img
          src={DarkModeIcon}
          alt=""
          className="w-5 h-5 select-none pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </button>
  );
};