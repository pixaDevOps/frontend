"use client";

import React, { useState } from "react";
import EditIcon from "../../assets/icons/Edit.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import AddCustomerModal from "./AddCustomerModal";
import ViewCustomer from "./ViewCustomer";

// Dummy Data
const customerData = Array(10).fill({
  id: "#000001",
  name: "Mohith DK",
  phone: "93674534",
  alternate: "--",
  email: "mohit@pixamount.in",
  pinCode: "577530",
  state: "Karnataka",
  address:
    "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
});

const CustomerTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleView = (user) => {
    setSelectedCustomer(user);
    setIsViewOpen(true);
  };

  const handleEdit = (e, user) => {
    e.stopPropagation(); // prevent row click
    setSelectedCustomer(user);
    setIsModalOpen(true);
  };

  const handleDelete = (e, user) => {
    e.stopPropagation(); // prevent row click
    console.log("Delete user", user);
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-2xl border border-border bg-background">
      <table className="min-w-full text-sm">
        <thead className="border-b bg-background text-primaryFont font-medium">
          <tr>
            <th className="p-4 text-left">User ID</th>
            <th className="p-4 text-left">User Name</th>
            <th className="p-4 text-left">Phone Number</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Address</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {customerData.map((user, idx) => (
            <tr
              key={idx}
              onClick={() => handleView(user)}
              className="text-primaryFont bg-background hover:bg-tabBg cursor-pointer transition"
            >
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.phone}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.address}</td>
              <td className="p-4">
                <div className="inline-flex items-center overflow-hidden">
                  <button
                    onClick={(e) => handleEdit(e, user)}
                    className="p-2 hover:bg-tabBg rounded transition"
                  >
                    <img src={EditIcon} alt="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, user)}
                    className="p-2 hover:bg-tabBg rounded transition"
                  >
                    <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        editData={selectedCustomer}
      />

      {/*  View Modal */}
      <ViewCustomer
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CustomerTable;
