"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import SubHeader from "../../hooks/SubHeader";

// Icons
import FilterIcon from "../../assets/icons/Filter.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import DownloadIcon from "../../assets/icons/DownloadReport.svg";

// Tables
import ProductTable from "../../components/tables/ProductTable";
import OrderTable from "../../components/tables/OrderTable";
import CustomerTable from "../../components/tables/CustomerTable";
import DonateTable from "../../components/tables/DonateTable"; // create this if not already

const ReportPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("report");
  const [activeTab, setActiveTab] = useState("Product");

  const tabItems = [
    { label: "Product", count: 283 },
    { label: "Orders", count: 283 },
    { label: "Customers", count: 283 },
    { label: "Donate", count: 283 },
  ];

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
            title="Report"
            buttonText="Download Report"
            buttonLink="#"
            icon={DownloadIcon}
            searchIcon={SearchIcon}
            filterIcon={FilterIcon}
          />

          {/* Tabs */}
          <div className="flex gap-5 mt-4 mb-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
            {tabItems.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`relative pb-2 transition duration-200 ${
                  activeTab === tab.label
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab.label}
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                  {tab.count.toString().padStart(3, "0")}
                </span>
                {activeTab === tab.label && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 rounded"></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "Product" && <ProductTable />}
            {activeTab === "Orders" && <OrderTable />}
            {activeTab === "Customers" && <CustomerTable />}
            {activeTab === "Donate" && <DonateTable />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPage;
