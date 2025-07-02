"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import SubHeader from "../../hooks/SubHeader";

import FilterIcon from "../../assets/icons/Filter.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import AddOrderIcon from "../../assets/icons/AddOrder.svg";

// 🧩 Reusable table
import DonateTable from "../../components/tables/DonateTable";

const DonatePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("donate");

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <SubHeader
            title="Donation"
            buttonText="Add Donation"
            buttonLink="/add-donation"
            icon={AddOrderIcon}
            searchIcon={SearchIcon}
            filterIcon={FilterIcon}
          />

          <DonateTable />
        </main>
      </div>
    </div>
  );
};

export default DonatePage;
