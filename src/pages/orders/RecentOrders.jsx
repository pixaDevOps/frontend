import React from "react";

export const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700 min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Most Recent Orders</h2>
        <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="min-w-full py-2 divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
  <tr className="text-left text-sm font-light text-gray-500 dark:text-gray-400 tracking-wide">
              <th className="px-2 py-2">ID Number</th>
              <th className="px-2 py-2">Customer Name</th>
              <th className="px-2 py-2 " >Price</th>
              <th className="px-2 py-2 ">Total Product</th>
              <th className="px-2 py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-2 px-2 font-semibold text-gray-900 dark:text-white">#{order.id}</td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400">{order.customerName}</td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400">
                  ₹ {order.price.toLocaleString()}
                </td>
                <td className="py-2 px-2 font-semibold text-center text-black dark:text-gray-400">{order.totalProducts}</td>
                <td className="py-2 px-2 font-semibold text-black dark:text-gray-400">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
