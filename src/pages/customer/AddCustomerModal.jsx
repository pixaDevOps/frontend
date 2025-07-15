"use client";

import React from "react";
import { X } from "lucide-react";
import Button from "../../components/atoms/Buttons";

const AddCustomerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-bold mb-4">Add Customer</h2>

        {/* Form */}
        <form className="space-y-3 text-sm">
          {/* Name */}
          <div>
            <label className="font-semibold">Name*</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Mobile & Alternate */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="font-semibold">Mobile Number*</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 10-digit number"
                type="tel"
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold">Alternate Number</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alternate"
                type="tel"
              />
            </div>
          </div>

          {/* Email & Pincode */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="font-semibold">Email*</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold">Pin code*</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter pin code"
                required
              />
            </div>
          </div>

          {/* State & Address Type */}
          <div>
            <label className="font-semibold">State*</label>
            <div className="flex items-center gap-3 mt-1">
              <select className="w-1/2 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500">
                <option>Auto</option>
                <option>Karnataka</option>
                <option>Maharashtra</option>
              </select>
              <div className="flex gap-2 text-xs">
                {["Home", "Work"].map((type) => (
                  <label key={type} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="addrType"
                      className="accent-blue-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <label className="font-semibold">Billing Address</label>
            <textarea
              className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              rows="2"
              placeholder="Enter address"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label className="font-semibold">Shipping Address*</label>
            <textarea
              className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              rows="2"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-right pt-2">
            <Button type="submit" size="medium" className="w-full sm:w-auto">
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
