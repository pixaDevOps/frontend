import React from "react";
import DarkModeIcon from "../../assets/icons/Modes.svg";

export const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-[51px] h-[24px] flex items-center bg-gray-300 dark:bg-gray-700 rounded-full px-1 transition-colors duration-300`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <div
        className={`absolute w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
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
