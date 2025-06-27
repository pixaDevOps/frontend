import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "../../assets/icons/Dashboard.svg";
import ProductIcon from "../../assets/icons/Products.svg";
import OrderIcon from "../../assets/icons/Orders.svg";
import CustomerIcon from "../../assets/icons/Customer.svg";
import ChatIcon from "../../assets/icons/Chat.svg";
import ReportIcon from "../../assets/icons/Report.svg";
import BrandLogo from "../../assets/icons/logo.svg";
import BrandName from "../../assets/icons/BrandName.svg";
import LeftIcon from "../../assets/icons/ToggleLeft.svg";
import RightIcon from "../../assets/icons/ToggleRight.svg";

// Menu items
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/" },
  {
    id: "products",
    label: "Products",
    icon: ProductIcon,
    submenu: [
      { id: "add-category", label: "Add Category", path: "/products/add-category" },
      { id: "add-product", label: "Add Product", path: "/products/add-product" },
    ],
  },
  { id: "orders", label: "Order Lists", icon: OrderIcon, path: "/orders" },
  { id: "customers", label: "Customer", icon: CustomerIcon, path: "/customers" },
  { id: "chat", label: "Chat", icon: ChatIcon, path: "/chat" },
  { id: "reports", label: "Report", icon: ReportIcon, path: "/reports" },
];

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  const getIconFilter = (isActive, isDark = false) => {
    if (isActive) return "brightness(0) invert(1)";
    return isDark ? "brightness(0) invert(1)" : "brightness(0)";
  };

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-[200px]"
      } transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col h-screen justify-between shadow-sm`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-center space-x-2">
          <img src={BrandLogo} alt="Logo" className="w-11 h-11 object-contain" />
          {!isCollapsed && (
            <img
              src={BrandName}
              alt="Ayushya Mandalam"
              className="h-7 object-contain dark:brightness-0 dark:invert"
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedSubmenu === item.id;

            return (
              <li key={item.id}>
                {!hasSubmenu ? (
                  <Link
                    to={item.path}
                    className={`w-full flex items-center rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                        : "text-black dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                    } ${isCollapsed ? "justify-center py-2" : "px-3 py-2 space-x-3"}`}
                  >
                    <div className="w-10 flex justify-center items-center">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={`transition-all duration-300 ${
                          isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        }`}
                        style={{ filter: getIconFilter(isActive, isDarkMode) }}
                      />
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium text-sm tracking-wide flex-1 text-left">
                        {item.label}
                      </span>
                    )}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        setExpandedSubmenu(isExpanded ? null : item.id)
                      }
                      className={`w-full flex items-center rounded-lg transition-all duration-200 group ${
                        isExpanded
                          ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                          : "text-black dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500"
                      } ${isCollapsed ? "justify-center py-2" : "px-3 py-2 space-x-3"}`}
                    >
                      <div className="w-10 flex justify-center items-center">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={`transition-all duration-300 ${
                            isCollapsed ? "w-6 h-6" : "w-5 h-5"
                          }`}
                          style={{ filter: getIconFilter(isExpanded, isDarkMode) }}
                        />
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium text-sm tracking-wide flex-1 text-left">
                          {item.label}
                        </span>
                      )}
                    </button>

                    {/* Submenu */}
                    {!isCollapsed && isExpanded && (
                      <ul className="mt-0 ml-12 space-y-0 relative">
                        {item.submenu.map((subItem, index) => {
                          const isSubActive = location.pathname === subItem.path;
                          const isLast = index === item.submenu.length - 1;

                          return (
                            <li key={subItem.id} className="relative">
                              <div className="absolute left-[-15px] w-4 h-6 border-l-2 border-b-2 border-black dark:border-gray-600 rounded-bl-md" />
                              {!isLast && (
                                <div className="absolute left-[-16px] top-7 w-0.5 h-6 dark:bg-gray-600" />
                              )}
                              <Link
                                to={subItem.path}
                                className={`block px-3 py-1.5 transition-all duration-200 text-sm ${
                                  isSubActive
                                    ? "font-medium text-blue-600"
                                    : "text-gray-600 dark:text-gray-400"
                                } hover:font-medium`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={onToggle}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-200 mx-auto block shadow-sm hover:shadow-md"
        >
          <img
            src={isCollapsed ? RightIcon : LeftIcon}
            alt="Toggle Sidebar"
            className="w-4 h-4"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
      </div>
    </div>
  );
};
