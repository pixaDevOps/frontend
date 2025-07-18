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
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // Modal control

  const tabItems = [
    { label: "All", count: 283 },
    { label: "In-stock", count: 263 },
    { label: "Out of stock", count: 3 },
    { label: "Trash", count: 3 },
  ];

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
        <SubHeader
  title="Product"
  buttonText="Add Product"
  icon={AddProductIcon}
  searchIcon={SearchIcon}
  filterIcon={FilterIcon}
  onClick={() => setIsAddProductModalOpen(true)} 
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

          {/* Product Table Switch */}
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
