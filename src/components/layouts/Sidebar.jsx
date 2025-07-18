"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "../../components/ui/ThemeContext";

import BrandLogo from "../../assets/icons/logo.svg";
import BrandName from "../../assets/icons/BrandName.svg";
import LeftIcon from "../../assets/icons/ToggleLeft.svg";
import RightIcon from "../../assets/icons/ToggleRight.svg";

import DashboardIcon from "../../assets/icons/Dashboard.svg";
import ProductIcon from "../../assets/icons/Products.svg";
import OrderIcon from "../../assets/icons/Orders.svg";
import CustomerIcon from "../../assets/icons/Customer.svg";
import ChatIcon from "../../assets/icons/Chat.svg";
import ReportIcon from "../../assets/icons/Report.svg";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  {
    id: "products",
    label: "Products",
    icon: ProductIcon,
    submenu: [
      { id: "category", label: "Add Category", path: "/products/category" },
      { id: "add-product", label: "Add Product", path: "/products/add-product" },
    ],
  },
  { id: "orders", label: "Order Lists", icon: OrderIcon, path: "/orders" },
  { id: "customers", label: "Customer", icon: CustomerIcon, path: "/customers" },
  { id: "reports", label: "Report", icon: ReportIcon, path: "/reports" },
];

const getIconClass = (isActive) =>
  isActive
    ? "filter brightness-0 invert"
    : "dark:filter dark:brightness-0 dark:invert filter brightness-0";

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  useEffect(() => {
    const current = menuItems.find((item) =>
      item.submenu?.some((sub) => sub.path === location.pathname)
    );
    if (current) setExpandedSubmenu(current.id);
  }, [location.pathname]);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 64 : 200 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col h-screen justify-between shadow-sm"
    >
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center justify-center space-x-2">
          <img src={BrandLogo} alt="Logo" className="w-11 h-11" />
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
      <nav className="flex-1 px-2 py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const hasSubmenu = item.submenu?.length;
            const isExpanded = expandedSubmenu === item.id;

            return (
              <li key={item.id}>
                {!hasSubmenu ? (
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-lg group ${
                      isActive
                        ? "bg-secondary text-white shadow-md"
                        : "text-black dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    } ${isCollapsed ? "justify-center px-2 py-2" : "px-3 py-2 space-x-3"}`}
                  >
                    <div className="w-10 flex justify-center items-center">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={`w-5 h-5 ${getIconClass(isActive)}`}
                      />
                    </div>
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setExpandedSubmenu(isExpanded ? null : item.id)
                      }
                      className={`flex items-center w-full rounded-lg ${
                        isExpanded
                          ? "bg-secondary text-white"
                          : "text-black dark:text-slate-300 hover:bg-secondary hover:text-white"
                      } ${isCollapsed ? "justify-center py-2" : "px-3 py-2 space-x-3"}`}
                    >
                      <div className="w-10 flex justify-center items-center">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={`w-5 h-5 ${getIconClass(isExpanded)}`}
                        />
                      </div>
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </button>
<AnimatePresence initial={false}>
{!isCollapsed && isExpanded && (
  <motion.ul
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="relative  ml-6 pl-1 space-y-2"
  >
    {/* Vertical line trunk */}
    <div className="absolute left-2 top-0 bottom-2 w-px bg-black dark:bg-gray-500" />

    {item.submenu.map((sub, i) => {
      const isSubActive = location.pathname === sub.path;
      return (
        <li key={sub.id} className="relative flex items-start justify-center">
          {/* Curved branch */}
          <span className="absolute left-1 top- w-4 h-4 border-l-2 border-b-2 border-black dark:border-gray-500 rounded-bl-md" />

          {/* Link */}
          <Link
            to={sub.path}
            className={`ml-4 block text-sm transition-colors duration-200 ${
              isSubActive
                ? "font-medium text-secondary"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {sub.label}
          </Link>
        </li>
      );
    })}
  </motion.ul>
)}


</AnimatePresence>

                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle */}
      <div className="relative">
        <button
          onClick={onToggle}
          className="absolute -right-4 bottom-5 w-7 h-7 rounded-full bg-secondary hover:bg-blue-700 text-white transition duration-200 shadow-lg border-1 border-white dark:border-slate-900 flex items-center justify-center z-10"
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
    </motion.div>
  );
};
