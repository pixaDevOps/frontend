import React, { useState } from 'react';
import OrderProductLayout from '../../components/ui/OrderProductLayout';
import Stepper from '../../components/ui/Stepper';
import Button from '../../components/atoms/Buttons';
import SearchIcon from '../../assets/icons/Search.svg';
import OrderConfirmationSuccess from './OrderConfirmation';

const OrderReviewSummary = ({ isOpen, onClose, onPrev, summaryData }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const products = summaryData || [
    { code: '00001', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00002', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
        { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },
    { code: '00003', name: 'Drugless Kingdom Book Version-1 (Kannada)', qty: 2, cost: 2299, delivery: 229 },

  ];

  const totalCost = products.reduce((sum, p) => sum + p.cost, 0);
  const deliveryCharge = products.reduce((sum, p) => sum + p.delivery, 0);
  const tax = 200;
  const totalAmount = totalCost + deliveryCharge + tax;

  if (showSuccess) {
    return <OrderConfirmationSuccess isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <OrderProductLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Add new Order"
      showFooter
      footerContent={
        <div className="flex justify-end gap-3">
          <Button onClick={onPrev} color="secondary">‹ Prev</Button>
          <Button onClick={() => setShowSuccess(true)}>Done ›</Button>
        </div>
      }
    >
      <Stepper currentStep={3} totalSteps={4} />

      <h4 className="text-sm font-semibold mt-4 mb-2">General Details</h4>
      <hr className="mb-4" />

      {/* Search + Done button aligned to right */}
      <div className="flex justify-end mb-3">
        <div className="flex items-center gap-2 w-1/2">
          <div className="relative w-full">
            <img
              src={SearchIcon}
              alt="Search"
              className="absolute left-3 top-1.5 w-4 h-4 opacity-60"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-1 text-sm focus:outline-none"
            />
          </div>
          <Button size="medium" className="min-w-[80px]">Done</Button>
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-[5fr_1fr_1fr_1fr_1fr] text-sm font-semibold text-gray-500 border-b pb-2">
        <span>Item</span>
        <span className="text-center">Qty</span>
        <span className="text-center">Cost</span>
        <span className="text-center">Total</span>
        <span className="text-center">Deliver</span>
      </div>

      {/* Product List */}
      <div className="max-h-64 overflow-y-auto">
        {products.map((product, index) => (
          <div key={index} className="grid grid-cols-[5fr_1fr_1fr_1fr_1fr] items-center py-2 text-xs">
            <div className="text-gray-700 truncate">
              <span className="text-[10px] text-gray-400 block">#{product.code}</span>
              <span className="block truncate">{product.name}</span>
            </div>
            <div className="text-center font-bold">{product.qty.toString().padStart(2, '0')}</div>
            <div className="text-center font-bold">₹ {product.cost}</div>
            <div className="text-center font-bold">₹ {product.cost}</div>
            <div className="text-center text-sm">₹ {product.delivery}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-end mt-2 text-xs border-t">
        <div className="w-full max-w-sm space-y-1 text-right mt-2">
          <p>Total Cost : <span className="font-bold text-sm">₹ {totalCost}</span></p>
          <p>Deliver Charge : <span className="font-bold text-sm">₹ {deliveryCharge}</span></p>
          <p>Total Tax 18% : <span className="font-bold text-sm">₹ {tax}</span></p>
          <hr />
          <p className="text-sm font-bold mt-2">Total Amount : ₹ {totalAmount}</p>
        </div>
      </div>
    </OrderProductLayout>
  );
};

export default OrderReviewSummary;
