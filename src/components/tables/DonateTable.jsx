"use client";

import React from "react";

// 🔹 Sample donate data
const donateData = [
  {
    id: "#DON001",
    name: "Mohith DK",
    amount: "₹1,000",
    date: "15-06-2025",
    mode: "UPI",
    status: "Received",
  },
  {
    id: "#DON002",
    name: "Shreya Rao",
    amount: "₹500",
    date: "14-06-2025",
    mode: "Cash",
    status: "Pending",
  },
  {
    id: "#DON003",
    name: "Anil Kumar",
    amount: "₹2,000",
    date: "13-06-2025",
    mode: "Card",
    status: "Received",
  },
];

const statusColorMap = {
  Received: "bg-green-500",
  Pending: "bg-yellow-500",
  Failed: "bg-red-500",
};

const DonateTable = () => {
  return (
    <div className="overflow-x-auto mt-4 rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="border-b dark:bg-gray-800 text-gray-700 dark:text-white font-medium">
          <tr>
            <th className="p-4 text-left">Donation ID</th>
            <th className="p-4 text-left">Donor Name</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Mode</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {donateData.map((donation, idx) => (
            <tr key={idx} className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
              <td className="p-4">{donation.id}</td>
              <td className="p-4">{donation.name}</td>
              <td className="p-4">{donation.amount}</td>
              <td className="p-4">{donation.date}</td>
              <td className="p-4">{donation.mode}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold text-white ${
                    statusColorMap[donation.status] || "bg-gray-500"
                  }`}
                >
                  {donation.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonateTable;
