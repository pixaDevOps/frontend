"use client";

import React from "react";
import { X } from "lucide-react";
import Button from "../../components/buttons/Buttons";

const ViewCustomer = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold text-primary dark:text-white mb-4 border-b pb-2">
          View Customer Profile
        </h2>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
          <div>
            <p className="font-semibold">Name</p>
            <p>{customer.name}</p>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <p className="font-semibold">Mobile Number</p>
              <p>{customer.phone}</p>
            </div>
            <div className="w-1/2">
              <p className="font-semibold">Alternate Number</p>
              <p>{customer.alternate || "--"}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <p className="font-semibold">Email</p>
              <p>{customer.email}</p>
            </div>
            <div className="w-1/2">
              <p className="font-semibold">Pin Code</p>
              <p>{customer.pinCode}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">State</p>
            <p>{customer.state}</p>
          </div>

          <div>
            <p className="font-semibold">Address</p>
            <p>{customer.address}</p>
          </div>
        </div>

        {/* Done Button */}
        <div className="text-right pt-6">
          <Button onClick={onClose} size="medium" className="w-full sm:w-auto">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
