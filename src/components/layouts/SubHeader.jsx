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
  const handleButtonClick = () => {
    if (onClick) return onClick();
    if (buttonLink) window.location.href = buttonLink;
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-primary dark:text-white">{title}</h2>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {searchIcon && (
          <button
            type="button"
            title="Search"
            className="w-9 h-9 flex items-center justify-center bg-basewhite dark:bg-gray-800 border border-bordergray dark:border-gray-700 rounded-lg transition hover:shadow"
          >
            <img
              src={searchIcon}
              alt="Search"
              className="w-5 h-5 dark:invert"
            />
          </button>
        )}

        {filterIcon && (
          <button
            type="button"
            title="Filter"
            className="w-9 h-9 flex items-center justify-center bg-basewhite dark:bg-gray-800 border border-bordergray dark:border-gray-700 rounded-lg transition hover:shadow"
          >
            <img
              src={filterIcon}
              alt="Filter"
              className="w-5 h-5 dark:invert"
            />
          </button>
        )}

        {/* Add / Action Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={!onClick && !buttonLink}
          className="flex items-center gap-2 text-xs font-medium bg-secondary text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {icon && <img src={icon} alt="" className="w-4 h-4" />}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
