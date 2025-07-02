"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import SubHeader from "../../hooks/SubHeader";
import AddCustomerIcon from "../../assets/icons/AddCustomer.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import FilterIcon from "../../assets/icons/Filter.svg";

// 🧩 Reusable Customer Table
import CustomerTable from "../../components/tables/CustomerTable";

const CustomerPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("customer");

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
            title="Customer"
            buttonText="Add Customer"
            buttonLink="/add-customer"
            icon={AddCustomerIcon}
            searchIcon={SearchIcon}
            filterIcon={FilterIcon}
          />

          {/* Customer Table */}
          <CustomerTable />
        </main>
      </div>
    </div>
  );
};

export default CustomerPage;
