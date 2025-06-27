import React from "react";

export const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Recent Orders</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">ID Number</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">
                Customer Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">
                Total Product
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900 dark:text-white">#{order.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900 dark:text-white">{order.customerName}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900 dark:text-white font-medium">
                    ₹ {order.price.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-900 dark:text-white">{order.totalProducts}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-500 dark:text-gray-400">{order.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
