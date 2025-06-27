import React from "react";
import { TrendingUp } from "lucide-react";

export const TopSellingProducts = ({ products }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
      case "Out of Stock":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
      case "Low Stock":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Product Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Sales</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Product Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Top</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900 dark:text-white font-medium">
                    ₹ {product.price.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900 dark:text-white">{product.sales}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-green-600 dark:text-green-400 font-bold">#{product.rank}</span>
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
