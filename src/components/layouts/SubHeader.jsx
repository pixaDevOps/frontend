"use client";

import React from "react";


const SubHeader = ({
  title,
  icon,
  buttonText,
  buttonLink,
  onClick,
  searchIcon,
  filterIcon,
}) => {
  // const navigate = useNavigate(); // optional if using SPA navigation

  const handleButtonClick = () => {
    if (onClick) return onClick();
    if (buttonLink) window.location.href = buttonLink;

  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>

      {/* Right Icons & Button */}
      <div className="flex items-center gap-2">
        {searchIcon && (
          <button
            type="button"
            title="Search"
            className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm transition"
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
            type="button"
            title="Filter"
            className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm transition"
          >
            <img
              src={filterIcon}
              alt="Filter"
              className="w-5 h-5 transition dark:invert"
            />
          </button>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="flex items-center gap-2 text-xs font-medium bg-secondary  text-white px-4 py-2 rounded-lg shadow transition"
        >
          {icon && <img src={icon} alt="icon" className="w-5 h-5" />}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
