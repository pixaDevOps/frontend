"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/layouts/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import SubHeader from "../../components/layouts/SubHeader";
import OrderFormCustomer from "./OrderFormCustomer";
import AddOrderIcon from "../../assets/icons/AddOrder.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import OrderTable from "./OrderTable";

const OrderLists = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("orders");
  const [activeTab, setActiveTab] = useState("All");
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const tabs = [
    { label: "All", count: 283 },
    { label: "In-progress", count: 53 },
    { label: "Shipped", count: 3 },
    { label: "Delivered", count: 3 },
    { label: "Canceled", count: 3 },
    { label: "Refund", count: 3 },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background dark:bg-gray-900 transition-colors duration-300">
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
          <SubHeader
            title="Order"
            buttonText="Add New Order"
            onClick={() => setIsOrderFormOpen(true)}
            icon={AddOrderIcon}
            searchIcon={SearchIcon}
            filterIcon={FilterIcon}
          />

          {/* Tabs */}
          <div className="flex gap-5 mt-4 mb-2 text-sm font-medium text-placeholdergray dark:text-gray-300">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`pb-2 flex items-center gap-1 border-b-2 transition-all duration-200 ${
                    isActive
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                  }`}
                >
                  {tab.label}
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded">
                    {tab.count.toString().padStart(3, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Order Table */}
          <OrderTable />
        </main>
      </div>

      {/* Modal for New Order */}
      {isOrderFormOpen && (
        <OrderFormCustomer
          isOpen={isOrderFormOpen}
          onClose={() => setIsOrderFormOpen(false)}
          onNext={() => {
            console.log("Next step clicked");
          }}
        />
      )}
    </div>
  );
};

export default OrderLists;
