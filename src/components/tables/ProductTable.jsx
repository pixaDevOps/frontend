"use client";

import React from "react";
import EyeIcon from "../../assets/icons/Eye.svg";
import EditIcon from "../../assets/icons/Edit.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";

const ProductTable = () => {
  return (
    <div className="overflow-x-auto mt-4 rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="border-b  dark:bg-gray-800 text-gray-700 dark:text-white font-medium">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Product ID</th>
            <th className="p-4 text-left">Product Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Sub Category</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array(8)
            .fill(null)
            .map((_, idx) => (
              <tr
                key={idx}
                className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              >
                <td className="p-4">
                  <img src="/book.png" alt="Book" className="w-10 rounded" />
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">
                  #00000{idx + 1}
                </td>
                <td className="p-4">Drugless Kingdom Book Version-{idx + 1}</td>
                <td className="p-4">₹2,199</td>
                <td className="p-4">400</td>
                <td className="p-4">Book</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">--</td>
            <td className="p-4">
  <div className="inline-flex items-center border rounded-full overflow-hidden">
    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <img src={EyeIcon} alt="View" className="w-4 h-4" />
    </button>
    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <img src={EditIcon} alt="Edit" className="w-4 h-4" />
    </button>
    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
      <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
    </button>
  </div>
</td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
