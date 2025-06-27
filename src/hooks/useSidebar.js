"use client";

import { useState, useEffect } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved preference in localStorage
    const savedMode = localStorage.getItem("darkMode");
    // Check for system preference
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Initialize state (use saved preference if exists, otherwise use system preference)
    const initialMode = savedMode ? JSON.parse(savedMode) : systemPrefersDark;
    setIsDarkMode(initialMode);
    updateDocumentClass(initialMode);
  }, []);

  const updateDocumentClass = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    updateDocumentClass(newMode);
  };

  return {
    isOpen,
    isDarkMode,
    toggleDarkMode,
    setIsOpen
  };
};