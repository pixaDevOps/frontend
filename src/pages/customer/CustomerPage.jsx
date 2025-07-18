"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/layouts/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import SubHeader from "../../components/layouts/SubHeader";
import AddCustomerIcon from "../../assets/icons/AddCustomer.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import CustomerTable from "./CustomerTable";
import AddCustomerModal from "./AddCustomerModal"; // Verify this path is correct

const CustomerPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("customer");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  console.log("Modal state:", isCustomerModalOpen); // Debugging

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
  icon={AddCustomerIcon}
  searchIcon={SearchIcon}
  filterIcon={FilterIcon}
  onClick={() => {  // Change from buttonAction to onClick
    console.log("Add Customer button clicked");
    setIsCustomerModalOpen(true);
  }}
/>

          <CustomerTable />

          {/* Add Customer Modal */}
          {isCustomerModalOpen && (
            <AddCustomerModal
              isOpen={isCustomerModalOpen}
              onClose={() => {
                console.log("Closing modal"); // Debugging
                setIsCustomerModalOpen(false);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerPage;