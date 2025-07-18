"use client";

import React, { useState } from "react";
import OrderDetailsModal from "../../pages/orders/OrderDetailsModal";// make sure path is correct

const orderData = [
  {
    id: "#000001",
    name: "Mohith Dk",
    phone: "9889786765",
    totalProduct: 12,
    date: "15-06-2025",
    address: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    status: "Deliver",
    totalCost: 8997,
    delivery: 0,
    tax: 200,
    totalAmount: 9197,
    items: Array(5).fill({
      name: "Drugless Kingdom Book Version-1 (Kannada)",
      quantity: 2,
      price: 2199,
      image: "/your-image-path.jpg",
    }),
  },
  {
    id: "#000002",
    name: "Mohith Dk",
    phone: "9889786765",
    totalProduct: 12,
    date: "15-06-2025",
    address: "Near 089 Kutch Green Apt...",
    status: "In-progress",
    totalCost: 8997,
    delivery: 0,
    tax: 200,
    totalAmount: 9197,
    items: Array(5).fill({
      name: "Drugless Kingdom Book Version-1 (Kannada)",
      quantity: 2,
      price: 2199,
      image: "/your-image-path.jpg",
    }),
  },
  {
    id: "#000003",
    name: "Mohith Dk",
    phone: "9889786765",
    totalProduct: 12,
    date: "15-06-2025",
    address: "Near 089 Kutch Green Apt...",
    status: "Cancel",
    totalCost: 8997,
    delivery: 0,
    tax: 200,
    totalAmount: 9197,
    items: Array(5).fill({
      name: "Drugless Kingdom Book Version-1 (Kannada)",
      quantity: 2,
      price: 2199,
      image: "/your-image-path.jpg",
    }),
  },
];

const statusColorMap = {
  Deliver: "bg-green-500",
  "In-progress": "bg-yellow-500",
  Cancel: "bg-red-500",
};

const OrderTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 mt-4">
        <table className="min-w-full text-sm">
          <thead className="border-b dark:bg-gray-800 text-gray-700 dark:text-white font-medium">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone Number</th>
              <th className="p-4 text-left">Total Product</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orderData.map((order, idx) => (
              <tr
                key={idx}
                className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">{order.totalProduct}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4 truncate">{order.address}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold text-white text-center inline-block min-w-[100px] ${
                      statusColorMap[order.status] || "bg-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
};

export default OrderTable;
