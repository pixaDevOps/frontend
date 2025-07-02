"use client";

import React, { useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SubHeader from "../../hooks/SubHeader";

// Icon
import AddCategoryIcon from "../../assets/icons/AddCategory.svg";

const AddCategory = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("products-add-category");

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {/* SubHeader */}
          <SubHeader
            title="Category"
            buttonText="Add Category"
            buttonLink="/add-category"
            icon={AddCategoryIcon}
          />

          {/* Category Cards */}
<div className="grid grid-cols-2 sm:grid-cols-6  mt-5">
  {/* Personal Care Box */}
  <div className="bg-[#B8775C] rounded-xl p-3 w-44 aspect-square flex flex-col items-center justify-between text-white shadow">
    <img src="/personal-care.png" alt="Personal Care" className="w-50 h-50 object-contain" />
    <span className="bg-white text-black px-4 py-[2px] rounded-full text-base font-semibold">
      Personal Care
    </span>
  </div>

  {/* Crystals Box */}
  <div className="bg-gradient-to-tr from-purple-400 to-purple-700 rounded-xl p-3 w-44 aspect-square flex flex-col items-center justify-between text-white shadow">
    <img src="/crystals.png" alt="Crystals" className="w-12 h-12 object-contain" />
    <span className="bg-white text-black px-3 py-[2px] rounded-full text-base font-semibold">
      Crystals
    </span>
  </div>

  {/* Repeats (Optional) */}
  <div className="bg-[#B8775C] rounded-xl p-3 w-44 aspect-square flex flex-col items-center justify-between text-white shadow">
    <img src="/personal-care.png" alt="Personal Care" className="w-12 h-12 object-contain" />
    <span className="bg-white text-black px-3 py-[2px] rounded-full text-base font-semibold">
      Personal Care
    </span>
  </div>

  <div className="bg-gradient-to-tr from-purple-400 to-purple-700 rounded-xl p-3 w-44 aspect-square flex flex-col items-center justify-between text-white shadow">
    <img src="/crystals.png" alt="Crystals" className="w-12 h-12 object-contain" />
    <span className="bg-white text-black px-3 py-[2px] rounded-full text-base font-semibold">
      Crystals
    </span>
  </div>
</div>


        </main>
      </div>
    </div>
  );
};

export default AddCategory;
