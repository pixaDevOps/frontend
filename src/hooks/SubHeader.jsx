"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const SubHeader = ({
  title,
  icon,
  buttonText,
  buttonLink,
  searchIcon,
  filterIcon
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>

      {/* Right Side Icons and Button */}
      <div className="flex items-center gap-2">
        {searchIcon && (
          <button
            className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm transition"
            title="Search"
          >
            <img
              src={searchIcon}
              alt="Search"
              className="w-5 h-5 transition dark:invert"
            />
          </button>
        )}
        {filterIcon && (
          <button
            className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm transition"
            title="Filter"
          >
            <img
              src={filterIcon}
              alt="Filter"
              className="w-5 h-5 transition dark:invert"
            />
          </button>
        )}
        <button
          onClick={() => navigate(buttonLink)}
          className="flex items-center gap-2 text-xs font-medium bg-secondary hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          {icon && <img src={icon} alt="icon" className="w-5 h-5" />}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
