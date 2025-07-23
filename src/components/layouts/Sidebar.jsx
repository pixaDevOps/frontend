"use client";
import React from "react";
import { menuItems } from "../../constants/menuItems";
import SidebarLink from "./SidebarLink";
import BrandLogo from "../../assets/icons/logo.svg";
import BrandName from "../../assets/icons/BrandName.svg";
import LeftIcon from "../../assets/icons/ToggleLeft.svg";
import RightIcon from "../../assets/icons/ToggleRight.svg";
import clsx from "clsx";
import { motion } from "framer-motion";

export const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div
      className={clsx(
        "transition-none duration-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col h-screen justify-between shadow-sm relative",
        isCollapsed ? "w-16" : "w-52"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-center space-x-2">
        <img src={BrandLogo} alt="Logo" className="w-11 h-11" />
        {!isCollapsed && (
          <img
            src={BrandName}
            alt="Brand"
            className="h-7 object-contain dark:brightness-0 dark:invert"
          />
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <SidebarLink item={item} isCollapsed={isCollapsed} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Collapse Toggle Button */}
      <div className="relative">
        <button
          onClick={onToggle}
          className="absolute -right-4 bottom-5 w-7 h-7 rounded-full bg-secondary hover:bg-blue-700 text-white transition-colors duration-200 shadow-lg border border-white dark:border-slate-900 flex items-center justify-center z-10"
        >
          <motion.img
            src={isCollapsed ? RightIcon : LeftIcon}
            alt="Toggle Sidebar"
            key={isCollapsed ? "right" : "left"}
            initial={{ rotate: isCollapsed ? -180 : 0 }}
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 filter brightness-0 invert"
          />
        </button>
      </div>
    </div>
  );
};