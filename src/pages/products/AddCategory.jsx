"use client";

import React, { useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Sidebar } from "../../components/sidebar/Sidebar";
const AddCategory = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("products-add-category");

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader  />
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock Category Cards */}
            <div className="bg-[#B8775C] rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow">
              <img src="/personal-care.png" alt="Personal Care" className="w-20 mb-3" />
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">Personal Care</span>
            </div>
            <div className="bg-gradient-to-tr from-purple-400 to-purple-700 rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow">
              <img src="/crystals.png" alt="Crystals" className="w-20 mb-3" />
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">Crystals</span>
            </div>
            {/* Add more as needed */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCategory;
