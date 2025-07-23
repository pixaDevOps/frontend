"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/layouts/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import SubHeader from "../../components/layouts/SubHeader";
import AddProductModal from "./AddProductModal";

// Icons
import AddProductIcon from "../../assets/icons/AddProduct.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import SearchIcon from "../../assets/icons/Search.svg";

// Tables
import ProductTable from "./ProductTable";
import TrashPage from "./TrashPage";

const ProductListPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("products-add-product");
  const [activeTab, setActiveTab] = useState("All");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const tabItems = [
    { label: "All", count: 283 },
    { label: "In-stock", count: 263 },
    { label: "Out of stock", count: 3 },
    { label: "Trash", count: 3 },
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
          {/* Header */}
          <SubHeader
            title="Product"
            buttonText="Add Product"
            icon={AddProductIcon}
            searchIcon={SearchIcon}
            filterIcon={FilterIcon}
            onClick={() => setIsAddProductModalOpen(true)}
          />

          {/* Tabs */}
          <div className="flex gap-5 mt-4 mb-2 text-sm font-medium text-placeholdergray dark:text-gray-300">
            {tabItems.map(({ label, count }) => {
              const isActive = activeTab === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  aria-current={isActive ? "page" : undefined}
                  className={`pb-2 text-sm font-medium flex items-center gap-1 border-b-2 transition-all duration-200 ${
                    isActive
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                  }`}
                >
                  {label}
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded">
                    {count.toString().padStart(3, "0")}
                  </span>
                 
                </button>
              );
            })}
          </div>

          {/* Product Table View */}
          {activeTab === "Trash" ? <TrashPage /> : <ProductTable />}
        </main>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default ProductListPage;
