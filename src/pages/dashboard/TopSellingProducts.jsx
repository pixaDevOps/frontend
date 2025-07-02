import React from "react";
import { TrendingUp } from "lucide-react";

export const TopSellingProducts = ({ products }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700 min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top Selling Products</h2>
        <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
  <tr className="text-left text-sm font-light text-gray-500 dark:text-gray-400 tracking-wide">
              <th className="py-2 px-2">Product Name</th>
              <th className="py-2 px-2">Price</th>
              <th className="py-2 px-2">Sales</th>
              <th className="py-2 px-2">Product Status</th>
              <th className="py-2 px-2">Top</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-2 px-2 font-semibold text-gray-900 dark:text-white">{product.name}</td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400">
                  ₹ {product.price.toLocaleString()}
                </td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400">{product.sales}</td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400">{product.status}</td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400 flex items-center gap-1">
                  #{product.rank}
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
