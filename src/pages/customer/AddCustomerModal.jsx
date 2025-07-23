"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../../components/buttons/Buttons";

const AddCustomerModal = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  // Form State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternate, setAlternate] = useState("");
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  // Pre-fill for edit
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setMobile(editData.phone?.replace("+91 ", "") || "");
      setAlternate(editData.alternate || "");
      setEmail(editData.email || "");
      setPinCode(editData.pinCode || "");
      setState(editData.state || "Auto");
      setAddressType(editData.addressType || "Home");
      setBillingAddress(editData.billingAddress || "");
      setShippingAddress(editData.address || "");
    }
  }, [editData]);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const customer = {
      name,
      phone: `+91 ${mobile}`,
      alternate,
      email,
      pinCode,
      state,
      addressType,
      billingAddress,
      address: shippingAddress,
    };

    console.log("Customer Saved:", customer);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-background dark:bg-gray-900 w-full max-w-md rounded-xl p-6 relative shadow-xl border border-bordergray dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/*  Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/*  Title */}
        <h2 className="text-lg font-bold text-primary dark:text-white mb-4">
          {editData ? "Edit Customer" : "Add Customer"}
        </h2>

        {/*  Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-primary dark:text-white">
          {/* Name */}
          <div>
            <label className="font-semibold">Name*</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter name"
            />
          </div>

          {/* Mobile + Alternate */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="font-semibold">Mobile Number*</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
                pattern="[0-9]{10}"
                required
                placeholder="Enter 10-digit number"
                className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold">Alternate Number</label>
              <input
                value={alternate}
                onChange={(e) => setAlternate(e.target.value)}
                type="tel"
                placeholder="Enter alternate"
                className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* Email + Pin */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="font-semibold">Email*</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter email"
                className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold">Pin Code*</label>
              <input
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
                placeholder="Enter pin code"
                className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* State + Address Type */}
          <div>
            <label className="font-semibold">State*</label>
            <div className="flex items-center gap-3 mt-1">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-1/2 border border-bordergray rounded px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option>Auto</option>
                <option>Karnataka</option>
                <option>Maharashtra</option>
              </select>
              <div className="flex gap-4 text-xs">
                {["Home", "Work"].map((type) => (
                  <label key={type} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="addrType"
                      checked={addressType === type}
                      onChange={() => setAddressType(type)}
                      className="accent-secondary"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Billing */}
          <div>
            <label className="font-semibold">Billing Address</label>
            <textarea
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              rows="2"
              placeholder="Enter address"
              className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Shipping */}
          <div>
            <label className="font-semibold">Shipping Address*</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              rows="2"
              required
              placeholder="Enter address"
              className="w-full border border-bordergray rounded px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Submit */}
          <div className="text-right pt-3">
            <Button type="submit" size="medium" className="w-full sm:w-auto">
              {editData ? "Update" : "Done"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
