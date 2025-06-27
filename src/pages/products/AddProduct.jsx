"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";

const AddProduct = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("products-add-product");

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
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Product</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Product ID</th>
                  <th className="p-3 text-left">Product Name</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Sub Category</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array(8).fill(null).map((_, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3"><img src="/book.png" alt="Book" className="w-10" /></td>
                    <td className="p-3 text-gray-500 font-medium">#000001</td>
                    <td className="p-3">Drugless Kingdom Book Version-1 (Kannada)</td>
                    <td className="p-3">₹2,199</td>
                    <td className="p-3">400</td>
                    <td className="p-3">Book</td>
                    <td className="p-3">--</td>
                    <td className="p-3 space-x-2">
                      <button className="text-blue-500">👁</button>
                      <button className="text-red-500">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;
