"use client";

import React from "react";
import DarkModeIcon from "../../assets/icons/Modes.svg";
import { useTheme } from "./ThemeContext";

/**
 * ThemeToggle – toggles dark/light mode using context
 * Uses Tailwind darkMode: 'class' strategy (class applied to <html>)
 */
export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative w-[45px] h-[23px] flex items-center rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700"
    >
      {/* Toggle circle (slider) */}
      <div
        className={`absolute w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center 
          ${isDark ? "translate-x-6 bg-black" : "translate-x-0 bg-white"}`}
      >
        {/* Icon inside toggle */}
        <img
          src={DarkModeIcon}
          alt=""
          aria-hidden="true"
          className="w-5 h-5 select-none pointer-events-none"
        />
      </div>
    </button>
  );
};
