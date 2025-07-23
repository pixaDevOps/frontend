import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const SidebarLink = ({ item, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  const baseClass = "flex items-center rounded-lg group transition duration-150";
  const activeClass = "bg-secondary text-white shadow-md";
  const inactiveClass = "text-black dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800";
  const collapsedPadding = "justify-center px-2 py-2";
  const expandedPadding = "px-3 py-2 space-x-3";

  return (
    <Link
      to={item.path}
      className={clsx(
        baseClass,
        isActive ? activeClass : inactiveClass,
        isCollapsed ? collapsedPadding : expandedPadding
      )}
    >
      <div className="w-10 flex justify-center items-center">
        <img
          src={item.icon}
          alt={item.label}
          className={clsx(
            "w-5 h-5",
            isActive
              ? "filter brightness-0 invert"
              : "dark:filter dark:brightness-0 dark:invert filter brightness-0"
          )}
        />
      </div>
      {!isCollapsed && (
        <span className="text-sm font-medium whitespace-nowrap translate-y-[1px]">
          {item.label}
        </span>
      )}
    </Link>
  );
};

export default SidebarLink;