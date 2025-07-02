"use client";

import React from "react";
import EditIcon from "../../assets/icons/Edit.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";

const customerData = Array(10).fill({
  id: "#000001",
  name: "Mohith DK",
  phone: "+91 9586387893",
  email: "mohit@pixamount.in",
  address: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
});

const CustomerTable = () => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 mt-4">
      <table className="min-w-full text-sm">
        <thead className="border-b dark:bg-gray-800 text-gray-700 dark:text-white font-medium">
          <tr>
            <th className="p-4 text-left">User ID</th>
            <th className="p-4 text-left">User Name</th>
            <th className="p-4 text-left">Phone Number</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Address</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {customerData.map((user, idx) => (
            <tr key={idx} className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.phone}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.address}</td>
              <td className="p-4 space-x-2">
                          <td className="p-4">
                  <div className="inline-flex items-center  overflow-hidden">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                      <img src={EditIcon} alt="Edit" className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                    </button>
                  </div>
                </td>              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
